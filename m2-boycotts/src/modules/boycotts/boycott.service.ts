import { prisma } from "../../config/prisma";
import {
  createOrUpdateBoycottDocument,
  getAppUserDocumentByUserId,
  getBoycottDocumentByMysqlId,
  getEntityDocumentByEntityId,
  getInjusticeTypeDocumentById,
  updateBoycottDocument,
} from "../../../../m0-base-datos/src/services/mongoDocuments.service";
import type { BoycottDocument } from "../../../../m0-base-datos/src/types/mongoDocuments";

/*
  Servicio: boycott.service.ts
  Descripcion: logica del CRUD principal de boycotts para el usuario general.
               Crea y mantiene el registro en MySQL y sincroniza el documento
               en Mongo (descripcion y evidencia) usando los servicios de M0.
  Autor: Persona 1 - M2 Boycotts
*/

export type CrearBoycottInput = {
  title: string;
  description: string;
  creatorId: number;
  creatorUsername?: string;
  entityId: number;
  countryId: number;
  injusticeTypeId: number;
  boycottStateId: number;
  caseNumber?: number;
};

export type ActualizarBoycottInput = {
  title?: string;
  description?: string;
  countryId?: number;
  injusticeTypeId?: number;
  entityId?: number;
  caseNumber?: number;
};

// resultado de las operaciones que pueden fallar por permisos o por no existir
export type ResultadoOperacion<T> =
  | { estado: "ok"; data: T }
  | { estado: "no_encontrado" }
  | { estado: "sin_permiso" };

// seleccion que comparten detalle y mis boycotts, alineada con lo que ya
// devuelve la Persona 2 en el listado para no romper coherencia con el frontend
const boycottSelect = {
  BoycottID: true,
  Title: true,
  CaseNumber: true,
  PublicationDate: true,
  LastUpdateDate: true,
  VotesInFavor: true,
  VotesAgainst: true,
  NumberComments: true,
  NumberFavorites: true,
  MongoDocumentId: true,
  DeletedByUser: true,
  CreatorID: true,
  Entity: {
    select: {
      EntityID: true,
      EntityName: true,
      Description: true,
      MongoDocumentID: true,
      CategoryEntity: { select: { CategoryEntityID: true, CategoryName: true } },
      IndustryType: { select: { IndustryName: true } },
      Sector: { select: { SectorName: true } },
    },
  },
  InjusticeType: { select: { InjusticeTypeID: true, InjusticeName: true } },
  Country: {
    select: {
      CountryID: true,
      CountryName: true,
      Continent: { select: { ContinentName: true } },
    },
  },
  BoycottState: { select: { BoycottStateID: true, StateName: true } },
} as const;

// arma los datos de evidencia que vienen del documento Mongo
function mapearEvidencia(documento: BoycottDocument | null) {
  if (!documento?.evidence?.length) {
    return [];
  }

  return documento.evidence
    .filter((archivo) => Boolean(archivo.fileName))
    .map((archivo) => ({
      id: String(archivo.mongoFileId ?? archivo.gridFsId ?? ""),
      nombre: archivo.fileName,
      tipo: archivo.contentType,
      tamano: archivo.fileSize,
    }))
    .filter((archivo) => archivo.id.length > 0);
}

/*
  Funcion: crearBoycott.
  Descripcion: crea el boycott en MySQL y luego el documento base en Mongo con
               la descripcion. Guarda el id del documento Mongo de vuelta en MySQL.
  Salida: ids del boycott y del documento Mongo.
*/
export async function crearBoycott(input: CrearBoycottInput) {
  const boycott = await prisma.boycott.create({
    data: {
      Title: input.title,
      CaseNumber: input.caseNumber ?? null,
      CreatorID: input.creatorId,
      BoycottStateID: input.boycottStateId,
      CountryID: input.countryId,
      InjusticeTypeID: input.injusticeTypeId,
      EntityID: input.entityId,
      CreatedBy: input.creatorId,
    },
    select: {
      BoycottID: true,
      Title: true,
      CaseNumber: true,
      PublicationDate: true,
      CreatorID: true,
      Country: { select: { CountryID: true, CountryName: true } },
      InjusticeType: { select: { InjusticeTypeID: true, InjusticeName: true } },
      Entity: {
        select: {
          EntityID: true,
          EntityName: true,
          Description: true,
          CategoryEntity: { select: { CategoryEntityID: true, CategoryName: true } },
        },
      },
    },
  });

  const documento: BoycottDocument = {
    mysqlid: boycott.BoycottID,
    title: boycott.Title,
    description: input.description,
    creatorId: boycott.CreatorID,
    creatorUsername: input.creatorUsername ?? "",
    entityId: boycott.Entity.EntityID,
    entityName: boycott.Entity.EntityName,
    entityDescription: boycott.Entity.Description ?? undefined,
    countryId: boycott.Country.CountryID,
    countryName: boycott.Country.CountryName,
    injusticeTypeId: boycott.InjusticeType.InjusticeTypeID,
    injusticeTypeName: boycott.InjusticeType.InjusticeName,
    categoryId: boycott.Entity.CategoryEntity?.CategoryEntityID ?? 0,
    categoryName: boycott.Entity.CategoryEntity?.CategoryName ?? "",
    caseNumber: boycott.CaseNumber ?? undefined,
    filesNumber: 0,
    publicationDate: boycott.PublicationDate,
    lastUpdateDate: boycott.PublicationDate,
    evidence: [],
  };

  const documentoMongo = await createOrUpdateBoycottDocument(documento);

  if (documentoMongo?._id) {
    await prisma.boycott.update({
      where: { BoycottID: boycott.BoycottID },
      data: { MongoDocumentId: documentoMongo._id.toString() },
    });
  }

  return {
    boycottId: boycott.BoycottID,
    mongoDocumentId: documentoMongo?._id?.toString() ?? null,
  };
}

/*
  Funcion: obtenerBoycottPorId.
  Descripcion: trae el detalle completo de un boycott para la pantalla de
               detalle. Combina los datos de MySQL con la descripcion y la
               evidencia que viven en Mongo.
  Salida: objeto con el detalle o null si no existe.
*/
export async function obtenerBoycottPorId(id: number, userId: number | null = null) {
  const boycott = await prisma.boycott.findFirst({
    where: { BoycottID: id, DeletedByUser: false },
    select: {
      BoycottID: true,
      Title: true,
      CaseNumber: true,
      PublicationDate: true,
      LastUpdateDate: true,
      VotesInFavor: true,
      VotesAgainst: true,
      NumberComments: true,
      CreatorID: true,
      AppUser_Boycott_CreatorIDToAppUser: {
        select: { UserID: true, UserName: true },
      },
      Entity: {
        select: {
          EntityID: true,
          EntityName: true,
          Description: true,
          CategoryEntity: { select: { CategoryName: true } },
          Boycott: {
            where: { DeletedByUser: false },
            select: { InjusticeType: { select: { InjusticeName: true } } },
            distinct: ["InjusticeTypeID"],
          },
        },
      },
      InjusticeType: { select: { InjusticeTypeID: true, InjusticeName: true } },
      Country: { select: { CountryName: true } },
      BoycottState: { select: { StateName: true } },
      CommentBoycott: {
        where: { DeletedByUser: false },
        select: {
          CommentBoycottID: true,
          Description: true,
          CommentDate: true,
          VotesInFavor: true,
          VotesAgainst: true,
          CreatorID: true,
          AppUser_CommentBoycott_CreatorIDToAppUser: {
            select: { UserID: true, UserName: true },
          },
          ...(userId !== null && {
            UserVotesComment: {
              where: { UserID: userId },
              select: { IsInFavor: true },
            },
          }),
        },
        orderBy: { CommentDate: "desc" as const },
      },
      ...(userId !== null && {
        UserFavoriteBoycott: {
          where: { UserID: userId },
          select: { UserID: true },
        },
        UserVotesBoycott: {
          where: { UserID: userId },
          select: { IsInFavor: true },
        },
      }),
    },
  });

  if (!boycott) return null;

  const commentCreatorIds = [...new Set(boycott.CommentBoycott.map((c) => c.CreatorID))];

  const [boycottDoc, creatorDoc, entityDoc, injusticeDoc, ...commentDocs] =
    await Promise.all([
      getBoycottDocumentByMysqlId(id),
      getAppUserDocumentByUserId(boycott.CreatorID),
      getEntityDocumentByEntityId(boycott.Entity.EntityID),
      getInjusticeTypeDocumentById(boycott.InjusticeType.InjusticeTypeID),
      ...commentCreatorIds.map((cid) => getAppUserDocumentByUserId(cid)),
    ]);

  const commentCreatorDocMap = new Map(
    commentCreatorIds.map((cid, i) => [cid, commentDocs[i]])
  );

  function resolveFileId(f?: { mongoFileId?: unknown; gridFsId?: unknown }): string {
    return String(f?.mongoFileId ?? f?.gridFsId ?? "");
  }

  function deriveEvidenceType(contentType?: string): "pdf" | "image" | "video" | "file" {
    if (!contentType) return "file";
    if (contentType.startsWith("image/")) return "image";
    if (contentType.startsWith("video/")) return "video";
    if (contentType === "application/pdf") return "pdf";
    return "file";
  }

  return {
    id: boycott.BoycottID,
    user: {
      id: boycott.CreatorID,
      username: boycott.AppUser_Boycott_CreatorIDToAppUser.UserName,
      profilePicture: resolveFileId(creatorDoc?.picture) || undefined,
    },
    indicted: {
      id: boycott.Entity.EntityID,
      name: boycott.Entity.EntityName,
      picture: resolveFileId(entityDoc?.picture),
      description: boycott.Entity.Description ?? "",
      category: boycott.Entity.CategoryEntity.CategoryName,
      cases: boycott.Entity.Boycott.map((b) => b.InjusticeType.InjusticeName),
    },
    type: boycott.InjusticeType.InjusticeName,
    country: boycott.Country.CountryName,
    caseNumber: boycott.CaseNumber?.toString() ?? undefined,
    case: boycott.InjusticeType.InjusticeName,
    case_picture: resolveFileId(injusticeDoc?.picture),
    title: boycott.Title,
    description: boycottDoc?.description ?? "",
    creation_date: boycott.PublicationDate.toISOString(),
    last_updated: (boycott.LastUpdateDate ?? boycott.PublicationDate).toISOString(),
    votes: String(boycott.VotesInFavor - boycott.VotesAgainst),
    voted_by_user: userId !== null ? ((boycott as any).UserVotesBoycott?.[0]?.IsInFavor ?? null) : undefined,
    is_favorite: userId !== null ? (boycott as any).UserFavoriteBoycott?.length > 0 : undefined,
    comment_amount: String(boycott.NumberComments),
    comments: boycott.CommentBoycott.map((c) => ({
      id: c.CommentBoycottID,
      user: {
        id: c.CreatorID,
        username: c.AppUser_CommentBoycott_CreatorIDToAppUser.UserName,
        profilePicture: resolveFileId(commentCreatorDocMap.get(c.CreatorID)?.picture) || undefined,
      },
      content: c.Description,
      creation_date: c.CommentDate.toISOString(),
      votes: String(c.VotesInFavor - c.VotesAgainst),
      voted_by_user: userId !== null ? ((c as any).UserVotesComment?.[0]?.IsInFavor ?? null) : null,
    })),
    state: boycott.BoycottState.StateName,
    evidences: (boycottDoc?.evidence ?? []).map((f, i) => ({
      id: i + 1,
      name: f.fileName,
      type: deriveEvidenceType(f.contentType),
      extension: f.fileName.split(".").pop() ?? "",
      weight: f.fileSize ? `${(f.fileSize / 1024).toFixed(1)} KB` : "unknown",
    })),
  };
}

/*
  Funcion: actualizarBoycott.
  Descripcion: edita la informacion principal de un boycott. Solo el creador
               puede editarlo (permiso basico). Actualiza los campos presentes
               en MySQL y sincroniza titulo/descripcion en Mongo.
  Salida: resultado con el detalle actualizado, o no_encontrado / sin_permiso.
*/
export async function actualizarBoycott(
  id: number,
  input: ActualizarBoycottInput,
  usuarioId: number
): Promise<ResultadoOperacion<Awaited<ReturnType<typeof obtenerBoycottPorId>>>> {
  const actual = await prisma.boycott.findUnique({
    where: { BoycottID: id },
    select: { BoycottID: true, CreatorID: true },
  });

  if (!actual) {
    return { estado: "no_encontrado" };
  }

  if (actual.CreatorID !== usuarioId) {
    return { estado: "sin_permiso" };
  }

  // solo escribimos los campos que vienen en la peticion
  const datos: Record<string, unknown> = {
    ModifiedBy: usuarioId,
    ModifiedAt: new Date(),
    LastUpdateDate: new Date(),
  };

  if (input.title !== undefined) {
    datos.Title = input.title;
  }
  if (input.countryId !== undefined) {
    datos.CountryID = input.countryId;
  }
  if (input.injusticeTypeId !== undefined) {
    datos.InjusticeTypeID = input.injusticeTypeId;
  }
  if (input.entityId !== undefined) {
    datos.EntityID = input.entityId;
  }
  if (input.caseNumber !== undefined) {
    datos.CaseNumber = input.caseNumber;
  }

  await prisma.boycott.update({
    where: { BoycottID: id },
    data: datos,
  });

  // la descripcion y el titulo tambien viven en el documento Mongo
  const cambiosMongo: Partial<BoycottDocument> = {};
  if (input.title !== undefined) {
    cambiosMongo.title = input.title;
  }
  if (input.description !== undefined) {
    cambiosMongo.description = input.description;
  }

  if (Object.keys(cambiosMongo).length > 0) {
    await updateBoycottDocument(id, cambiosMongo);
  }

  const detalle = await obtenerBoycottPorId(id);
  return { estado: "ok", data: detalle };
}

/*
  Funcion: cambiarEstadoBoycott.
  Descripcion: maneja la eliminacion logica y la restauracion de un boycott.
               No borra fisicamente, solo marca DeletedByUser y DeletedAt.
               Solo el creador puede hacerlo.
  Salida: resultado con el detalle actualizado, o no_encontrado / sin_permiso.
*/
export async function cambiarEstadoBoycott(
  id: number,
  accion: "eliminar" | "restaurar",
  usuarioId: number
): Promise<ResultadoOperacion<Awaited<ReturnType<typeof obtenerBoycottPorId>>>> {
  const actual = await prisma.boycott.findUnique({
    where: { BoycottID: id },
    select: { BoycottID: true, CreatorID: true },
  });

  if (!actual) {
    return { estado: "no_encontrado" };
  }

  if (actual.CreatorID !== usuarioId) {
    return { estado: "sin_permiso" };
  }

  const eliminar = accion === "eliminar";

  await prisma.boycott.update({
    where: { BoycottID: id },
    data: {
      DeletedByUser: eliminar,
      DeletedAt: eliminar ? new Date() : null,
      ModifiedBy: usuarioId,
      ModifiedAt: new Date(),
    },
  });

  const detalle = await obtenerBoycottPorId(id);
  return { estado: "ok", data: detalle };
}

/*
  Funcion: listarMisBoycotts.
  Descripcion: lista los boycotts creados por un usuario, para la pantalla de
               mis boycotts. Por defecto deja por fuera los eliminados.
  Salida: arreglo de boycotts del usuario.
*/
export async function listarMisBoycotts(
  creatorId: number,
  incluirEliminados = false
) {
  return prisma.boycott.findMany({
    where: {
      CreatorID: creatorId,
      ...(incluirEliminados ? {} : { DeletedByUser: false }),
    },
    orderBy: { PublicationDate: "desc" },
    select: boycottSelect,
  });
}
