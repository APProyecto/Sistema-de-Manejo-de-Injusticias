// ── entity.service.ts ─────────────────────────────────────────────────────────

import { prisma } from "../../config/prisma";
import {
  getEntityDocumentByEntityId,
  createEntityDocument,
  updateEntityPicture,
} from "../../../../m0-base-datos/src/services/mongoDocuments.service";
import { FileMetadata } from "../../../../m0-base-datos/src/types/mongoDocuments";

/*
  Servicio: entity.service.ts
  Descripcion: logica del CRUD de entidades.
               Crea y mantiene el registro en MySQL y sincroniza el documento
               en Mongo usando los servicios de M0.
*/

export type CrearEntidadInput = {
  entityName: string;
  description?: string;
  categoryEntityId: number;
  industryTypeId?: number;
  sectorId?: number;
  createdBy: number;
  picture?: FileMetadata; 
};

export type ActualizarEntidadInput = {
  entityName?: string;
  description?: string;
  categoryEntityId?: number;
  industryTypeId?: number;
  sectorId?: number;
};

export type ResultadoOperacion<T> =
  | { estado: "ok"; data: T }
  | { estado: "no_encontrado" }
  | { estado: "duplicado" };

const entitySelect = {
  EntityID: true,
  EntityName: true,
  Description: true,
  MongoDocumentID: true,
  NumberBoycotts: true,
  CategoryEntity: { select: { CategoryEntityID: true, CategoryName: true } },
  IndustryType: { select: { IndustryTypeID: true, IndustryName: true } },
  Sector: { select: { SectorID: true, SectorName: true } },
} as const;

function resolveSafeFileId(
  metadata?: { mongoFileId?: unknown; gridFsId?: unknown }
): string {
  const fileId = metadata?.mongoFileId ?? metadata?.gridFsId;
  return typeof fileId === "string" || typeof fileId === "number"
    ? String(fileId)
    : "";
}

/*
  Funcion: crearEntidad.
  Descripcion: crea una entidad en MySQL. Verifica duplicados por nombre
               dentro de la misma categoria.
  Salida: entidad creada o duplicado.
*/

export async function crearEntidad(
  input: CrearEntidadInput
): Promise<ResultadoOperacion<{ entityId: number }>> {
  const existente = await prisma.entity.findFirst({
    where: {
      EntityName: input.entityName,
      CategoryEntityID: input.categoryEntityId,
    },
    select: { EntityID: true },
  });

  if (existente) return { estado: "duplicado" };

  // Crear la entidad en MySQL
  const entity = await prisma.entity.create({
    data: {
      EntityName: input.entityName,
      Description: input.description ?? null,
      CategoryEntityID: input.categoryEntityId,
      IndustryTypeID: input.industryTypeId ?? null,
      SectorID: input.sectorId ?? null,
      CreatedBy: input.createdBy,
      MongoDocumentID: null,
    },
    select: { 
      EntityID: true, 
      EntityName: true,
      Description: true,
      CategoryEntityID: true,
    },
  });

  if (input.picture) {
    try {
      await updateEntityPicture(
        entity.EntityID,
        entity.EntityName,
        input.picture  
      );
    } catch (error) {
      console.error("[crearEntidad] Error al guardar la imagen:", error);
    }
  } else {
    // Si no hay imagen, igual crear el documento base
    try {
      const { createOrUpdateEntityDocument } = await import("../../../../m0-base-datos/src/services/mongoDocuments.service");
      await createOrUpdateEntityDocument(entity.EntityID, entity.EntityName);
    } catch (error) {
      console.error("[crearEntidad] Error al crear documento base:", error);
    }
  }

  return { estado: "ok", data: { entityId: entity.EntityID } };
}

/*
  Funcion: obtenerEntidadPorId.
  Descripcion: trae el detalle de una entidad combinando MySQL y Mongo.
  Salida: objeto con el detalle o null si no existe.
*/
export async function obtenerEntidadPorId(id: number) {
  const entity = await prisma.entity.findUnique({
    where: { EntityID: id },
    select: entitySelect,
  });

  if (!entity) return null;

  const entityDoc = await getEntityDocumentByEntityId(id);

  return {
    id: entity.EntityID,
    name: entity.EntityName,
    description: entity.Description ?? "",
    picture: resolveSafeFileId(entityDoc?.picture),
    numberBoycotts: entity.NumberBoycotts,
    category: {
      id: entity.CategoryEntity.CategoryEntityID,
      name: entity.CategoryEntity.CategoryName,
    },
    industry: entity.IndustryType
      ? { id: entity.IndustryType.IndustryTypeID, name: entity.IndustryType.IndustryName }
      : null,
    sector: entity.Sector
      ? { id: entity.Sector.SectorID, name: entity.Sector.SectorName }
      : null,
  };
}

/*
  Funcion: actualizarEntidad.
  Descripcion: edita los campos de una entidad. Verifica duplicado si cambia
               el nombre dentro de la misma categoria.
  Salida: resultado con el detalle actualizado, o no_encontrado / duplicado.
*/
export async function actualizarEntidad(
  id: number,
  input: ActualizarEntidadInput,
  userId: number
): Promise<ResultadoOperacion<Awaited<ReturnType<typeof obtenerEntidadPorId>>>> {
  const actual = await prisma.entity.findUnique({
    where: { EntityID: id },
    select: { EntityID: true, EntityName: true, CategoryEntityID: true },
  });

  if (!actual) return { estado: "no_encontrado" };

  // check duplicate if name or category changed
  const nuevoNombre = input.entityName ?? actual.EntityName;
  const nuevaCategoria = input.categoryEntityId ?? actual.CategoryEntityID;
  const cambiaNombre = nuevoNombre !== actual.EntityName || nuevaCategoria !== actual.CategoryEntityID;

  if (cambiaNombre) {
    const duplicado = await prisma.entity.findFirst({
      where: {
        EntityName: nuevoNombre,
        CategoryEntityID: nuevaCategoria,
        NOT: { EntityID: id },
      },
      select: { EntityID: true },
    });
    if (duplicado) return { estado: "duplicado" };
  }

  const datos: Record<string, unknown> = {
    ModifiedBy: userId,
    ModifiedAt: new Date(),
  };

  if (input.entityName !== undefined)     datos.EntityName      = input.entityName;
  if (input.description !== undefined)    datos.Description     = input.description;
  if (input.categoryEntityId !== undefined) datos.CategoryEntityID = input.categoryEntityId;
  if (input.industryTypeId !== undefined) datos.IndustryTypeID  = input.industryTypeId;
  if (input.sectorId !== undefined)       datos.SectorID        = input.sectorId;

  await prisma.entity.update({ where: { EntityID: id }, data: datos });

  const detalle = await obtenerEntidadPorId(id);
  return { estado: "ok", data: detalle };
}

/*
  Funcion: eliminarEntidad.
  Descripcion: elimina una entidad fisicamente. Solo si no tiene boycotts
               activos asociados.
  Salida: resultado ok o no_encontrado.
*/
export async function eliminarEntidad(
  id: number
): Promise<ResultadoOperacion<null>> {
  const entity = await prisma.entity.findUnique({
    where: { EntityID: id },
    select: { EntityID: true, NumberBoycotts: true },
  });

  if (!entity) return { estado: "no_encontrado" };

  await prisma.entity.delete({ where: { EntityID: id } });

  return { estado: "ok", data: null };
}

// ── Agrega esta función en entity.service.ts ──

/*
  Función: obtenerTodasEntidades.
  Descripción: obtiene todas las entidades con paginación, ordenamiento
               y filtros opcionales.
  Parámetros:
    - page: número de página (default: 1)
    - limit: items por página (default: 10, max: 50)
    - search: búsqueda por nombre (opcional)
    - categoryEntityId: filtrar por categoría (opcional)
    - industryTypeId: filtrar por industria (opcional)
    - sectorId: filtrar por sector (opcional)
    - sortBy: campo para ordenar (default: "EntityName")
    - sortOrder: "asc" o "desc" (default: "asc")
  Salida: objeto con datos paginados
*/
export async function obtenerTodasEntidades(params: {
  page?: number;
  limit?: number;
  search?: string;
  categoryEntityId?: number;
  industryTypeId?: number;
  sectorId?: number;
  sortBy?: "EntityName" | "EntityID" | "CreatedAt" | "NumberBoycotts";
  sortOrder?: "asc" | "desc";
}) {
  const {
    page = 1,
    limit = 10,
    search,
    categoryEntityId,
    industryTypeId,
    sectorId,
    sortBy = "EntityName",
    sortOrder = "asc",
  } = params;

  // Limitar el máximo de items por página
  const take = Math.min(limit, 50);
  const skip = (page - 1) * take;

  // Construir el filtro where
  const where: Record<string, unknown> = {};

  if (search && search.trim()) {
    where.EntityName = { contains: search.trim() };
  }
  if (categoryEntityId) {
    where.CategoryEntityID = categoryEntityId;
  }
  if (industryTypeId) {
    where.IndustryTypeID = industryTypeId;
  }
  if (sectorId) {
    where.SectorID = sectorId;
  }

  // Ejecutar consultas en paralelo
  const [entities, total] = await Promise.all([
    prisma.entity.findMany({
      where,
      select: entitySelect,
      orderBy: { [sortBy]: sortOrder },
      skip,
      take,
    }),
    prisma.entity.count({ where }),
  ]);

  // Obtener documentos de MongoDB en paralelo
  const docs = await Promise.all(
    entities.map((entity) => getEntityDocumentByEntityId(entity.EntityID))
  );

  // Formatear los datos
  const data = entities.map((entity, index) => ({
    id: entity.EntityID,
    name: entity.EntityName,
    description: entity.Description ?? "",
    picture: resolveSafeFileId(docs[index]?.picture),
    numberBoycotts: entity.NumberBoycotts,
    category: {
      id: entity.CategoryEntity.CategoryEntityID,
      name: entity.CategoryEntity.CategoryName,
    },
    industry: entity.IndustryType
      ? {
          id: entity.IndustryType.IndustryTypeID,
          name: entity.IndustryType.IndustryName,
        }
      : null,
    sector: entity.Sector
      ? {
          id: entity.Sector.SectorID,
          name: entity.Sector.SectorName,
        }
      : null,
  }));

  return {
    data,
    pagination: {
      page,
      limit: take,
      total,
      totalPages: Math.ceil(total / take),
      hasNextPage: page < Math.ceil(total / take),
      hasPrevPage: page > 1,
    },
  };
}

/*
  Funcion: buscarEntidades.
  Descripcion: busca entidades por nombre y opcionalmente por categoria,
               industria o sector. Usada por el EntitySearchBar del frontend.
  Salida: array de entidades simplificadas.
*/
export async function buscarEntidades(
  q: string,
  categoryEntityId?: number,
  industryTypeId?: number,
  sectorId?: number
) {
  const where: Record<string, unknown> = {};

  if (q) where.EntityName = { contains: q };
  if (categoryEntityId) where.CategoryEntityID = categoryEntityId;
  if (industryTypeId)   where.IndustryTypeID   = industryTypeId;
  if (sectorId)         where.SectorID         = sectorId;

  const entities = await prisma.entity.findMany({
    where,
    select: {
      EntityID: true,
      EntityName: true,
      MongoDocumentID: true,
      CategoryEntity: { select: { CategoryEntityID: true, CategoryName: true } },
    },
    orderBy: { EntityName: "asc" },
    take: 20,
  });

  // fetch pictures in parallel
  const docs = await Promise.all(
    entities.map((e) => getEntityDocumentByEntityId(e.EntityID))
  );

  return entities.map((e, i) => ({
    id: e.EntityID,
    name: e.EntityName,
    picture: resolveSafeFileId(docs[i]?.picture),
    categoryId: e.CategoryEntity.CategoryEntityID,
    categoryName: e.CategoryEntity.CategoryName,
  }));
}