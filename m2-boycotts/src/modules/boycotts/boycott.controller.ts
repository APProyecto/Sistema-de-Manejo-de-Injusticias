import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
 
/*
  Controlador: boycott.controller.ts
  Descripción: Maneja el listado, búsqueda y filtrado de boycotts.
               Cubre: listado paginado, búsqueda por texto, categoría, país y tipo de injusticia.
  Autor: Persona 2 - M2 Boycotts
*/
 
// ─── Función auxiliar ─────────────────────────────────────────────────────────
 
/** Obtiene los parámetros de paginación desde la query de la solicitud. */
function obtenerPaginacion(query: Request["query"]) {
  const pagina = Math.max(1, parseInt(query.page as string) || 1);
  const tamano = Math.min(100, Math.max(1, parseInt(query.pageSize as string) || 10));
  return { pagina, tamano, saltar: (pagina - 1) * tamano };
}
 
// ─── Listar todos los boycotts activos (paginado) ────────────────────────────
 
/**
 * GET /api/boycotts
 * Parámetros de query:
 *   page        - número de página (por defecto 1)
 *   pageSize    - elementos por página (por defecto 10, máximo 100)
 *   orderBy     - "createdAt" | "votes" (por defecto "createdAt")
 */
export async function listarBoycotts(req: Request, res: Response): Promise<void> {
  try {
    const { pagina, tamano, saltar } = obtenerPaginacion(req.query);
    const ordenarPor = (req.query.orderBy as string) ?? "createdAt";
 
    // Construir el criterio de ordenamiento
    let ordenClause: object;
    if (ordenarPor === "votes") {
      ordenClause = { VotesInFavor: "desc" };
    } else {
      ordenClause = { PublicationDate: "desc" };
    }
 
    // Consultar boycotts activos y el total al mismo tiempo
    const [boycotts, total] = await Promise.all([
      prisma.boycott.findMany({
        where: {
          BoycottState: { StateName: "Active" },
          DeletedByUser: false,
        },
        select: {
          BoycottID: true,
          Title: true,
          PublicationDate: true,
          VotesInFavor: true,
          VotesAgainst: true,
          NumberComments: true,
          NumberFavorites: true,
          MongoDocumentId: true,
          Entity: {
            select: {
              EntityID: true,
              EntityName: true,
              MongoDocumentID: true,
              CategoryEntity: { select: { CategoryName: true } },
              IndustryType: { select: { IndustryName: true } },
            },
          },
          InjusticeType: { select: { InjusticeName: true } },
          Country: { select: { CountryName: true, Continent: { select: { ContinentName: true } } } },
          BoycottState: { select: { StateName: true } },
        },
        orderBy: ordenClause,
        skip: saltar,
        take: tamano,
      }),
      prisma.boycott.count({
        where: {
          BoycottState: { StateName: "Active" },
          DeletedByUser: false,
        },
      }),
    ]);
 
    res.json({
      ok: true,
      total,
      pagina,
      tamano,
      totalPaginas: Math.ceil(total / tamano),
      data: boycotts,
    });
  } catch (error) {
    console.error("[listarBoycotts]", error);
    res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
}
 
// ─── Buscar y filtrar boycotts ────────────────────────────────────────────────
 
/**
 * GET /api/boycotts/search
 * Parámetros de query:
 *   q               - texto libre (busca en título y nombre de entidad)
 *   categoryId      - ID de CategoryEntity
 *   injusticeTypeId - ID de InjusticeType
 *   countryId       - ID de Country
 *   continentId     - ID de Continent
 *   industryTypeId  - ID de IndustryType
 *   sectorId        - ID de Sector
 *   page, pageSize  - paginación
 *   orderBy         - "createdAt" | "votes"
 */
export async function buscarBoycotts(req: Request, res: Response): Promise<void> {
  try {
    const { pagina, tamano, saltar } = obtenerPaginacion(req.query);
    const {
      q,
      categoryId,
      injusticeTypeId,
      countryId,
      continentId,
      industryTypeId,
      sectorId,
      orderBy,
    } = req.query as Record<string, string | undefined>;
 
    // Construir el filtro dinámico según los parámetros recibidos
    // Construir filtro de Entity acumulando todos sus campos en un solo objeto
    const entityFilter: Record<string, unknown> = {};
    if (categoryId)     entityFilter.CategoryEntityID = parseInt(categoryId);
    if (industryTypeId) entityFilter.IndustryTypeID   = parseInt(industryTypeId);
    if (sectorId)       entityFilter.SectorID         = parseInt(sectorId);

    const where: Record<string, unknown> = {
      BoycottState: { StateName: "Active" },
      DeletedByUser: false,
    };

    if (injusticeTypeId) where.InjusticeTypeID = parseInt(injusticeTypeId);
    if (countryId)       where.CountryID       = parseInt(countryId);
    if (continentId)     where.Country         = { ContinentID: parseInt(continentId) };

    const tieneEntityFilter = Object.keys(entityFilter).length > 0;

    if (q && tieneEntityFilter) {
      where.AND = [
        { OR: [{ Title: { contains: q } }, { Entity: { EntityName: { contains: q } } }] },
        { Entity: entityFilter },
      ];
    } else if (q) {
      where.OR = [{ Title: { contains: q } }, { Entity: { EntityName: { contains: q } } }];
    } else if (tieneEntityFilter) {
      where.Entity = entityFilter;
    }
 
    const ordenClause =
      orderBy === "votes" ? { VotesInFavor: "desc" } : { PublicationDate: "desc" };
 
    const [boycotts, total] = await Promise.all([
      prisma.boycott.findMany({
        where,
        select: {
          BoycottID: true,
          Title: true,
          PublicationDate: true,
          VotesInFavor: true,
          VotesAgainst: true,
          NumberComments: true,
          NumberFavorites: true,
          MongoDocumentId: true,
          Entity: {
            select: {
              EntityID: true,
              EntityName: true,
              MongoDocumentID: true,
              CategoryEntity: { select: { CategoryName: true } },
              IndustryType: { select: { IndustryName: true } },
              Sector: { select: { SectorName: true } },
            },
          },
          InjusticeType: { select: { InjusticeName: true } },
          Country: { select: { CountryName: true, Continent: { select: { ContinentName: true } } } },
          BoycottState: { select: { StateName: true } },
        },
        orderBy: ordenClause,
        skip: saltar,
        take: tamano,
      }),
      prisma.boycott.count({ where }),
    ]);
 
    res.json({
      ok: true,
      total,
      pagina,
      tamano,
      totalPaginas: Math.ceil(total / tamano),
      data: boycotts,
    });
  } catch (error) {
    console.error("[buscarBoycotts]", error);
    res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
}
 
// ─── Obtener opciones de filtro (para los dropdowns del frontend) ─────────────
 
/**
 * GET /api/boycotts/filters
 * Devuelve todos los catálogos necesarios para armar los filtros en pantalla.
 */
export async function obtenerFiltros(_req: Request, res: Response): Promise<void> {
  try {
    const [categorias, tiposInjusticia, paises, continentes, industrias, sectores] =
      await Promise.all([
        prisma.categoryEntity.findMany({ select: { CategoryEntityID: true, CategoryName: true } }),
        prisma.injusticeType.findMany({ select: { InjusticeTypeID: true, InjusticeName: true } }),
        prisma.country.findMany({
          select: { CountryID: true, CountryName: true, ContinentID: true },
          orderBy: { CountryName: "asc" },
        }),
        prisma.continent.findMany({ select: { ContinentID: true, ContinentName: true } }),
        prisma.industryType.findMany({ select: { IndustryTypeID: true, IndustryName: true } }),
        prisma.sector.findMany({ select: { SectorID: true, SectorName: true } }),
      ]);
 
    res.json({
      ok: true,
      data: { categorias, tiposInjusticia, paises, continentes, industrias, sectores },
    });
  } catch (error) {
    console.error("[obtenerFiltros]", error);
    res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
}