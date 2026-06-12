import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { getAppUserDocumentByUserId, getBoycottDocumentByMysqlId, getEntityDocumentByEntityId } from "../../../../m0-base-datos/src/services/mongoDocuments.service";
import { obtenerBoycottPorId } from "./boycott.service";
 
/*
  Controlador: boycott.controller.ts
  Descripción: Maneja el listado, búsqueda y filtrado de boycotts.
               Cubre: listado paginado, búsqueda por texto, categoría, país y tipo de injusticia.
  Autor: Persona 2 - M2 Boycotts
*/
 
// ─── Función auxiliar ─────────────────────────────────────────────────────────
 
/** Obtiene los parámetros de paginación desde la query de la solicitud. */
function obtenerPaginacion(query: Request["query"]) {
  const pagina = Math.max(1, Number.parseInt(query.page as string, 10) || 1);
  const tamano = Math.min(100, Math.max(1, Number.parseInt(query.pageSize as string, 10) || 10));
  return { pagina, tamano, saltar: (pagina - 1) * tamano };
}

//select reutilizable
function buildSelect(userId: number | null) {
  return {
    BoycottID: true,
    Title: true,
    CaseNumber: true,
    PublicationDate: true,
    VotesInFavor: true,
    VotesAgainst: true,
    NumberComments: true,
    MongoDocumentId: true,
    CreatorID: true,
    AppUser_Boycott_CreatorIDToAppUser: {
      select: { UserName: true },
    },
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
    Country: {
      select: { CountryName: true, Continent: { select: { ContinentName: true } } },
    },
    BoycottState: { select: { StateName: true } },
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
  } as const;
}


//mapper
function resolveMongoFileId(
  fileMetadata: { mongoFileId?: unknown; gridFsId?: unknown } | undefined
): string {
  if (!fileMetadata) return "";
  const fileId = fileMetadata.mongoFileId ?? fileMetadata.gridFsId;
  return typeof fileId === "string" || typeof fileId === "number" ? String(fileId) : "";
}

async function mapBoycottToFrontend(
  b: any,
  userId: number | null
) {
  const [boycottDoc, userDoc, entityDoc] = await Promise.all([
    getBoycottDocumentByMysqlId(b.BoycottID),
    getAppUserDocumentByUserId(b.CreatorID),
    b.Entity ? getEntityDocumentByEntityId(b.Entity.EntityID) : null,
  ]);

  // case_picture: first evidence file on the boycott doc, if any
  const casePicture = resolveMongoFileId(boycottDoc?.evidence?.[0]);

  return {
    id: b.BoycottID,
    username: b.AppUser_Boycott_CreatorIDToAppUser?.UserName ?? "",
    user_picture: resolveMongoFileId(userDoc?.picture),
    indicted: b.Entity?.EntityName ?? "",
    indicted_picture: resolveMongoFileId(entityDoc?.picture),
    case: b.InjusticeType?.InjusticeName ?? "",
    case_picture: casePicture,
    title: b.Title,
    description: boycottDoc?.description ?? "",
    creation_date: b.PublicationDate.toISOString(),
    votes: String(b.VotesInFavor - b.VotesAgainst),
    voted_by_user: userId === null ? undefined : (b.UserVotesBoycott?.[0]?.IsInFavor ?? null),
    coments: String(b.NumberComments),
    evidences: String(boycottDoc?.evidence?.length ?? 0),
    state: b.BoycottState?.StateName ?? "",
    caseNumber: b.CaseNumber ?? undefined,
    is_favorite: userId === null ? undefined : b.UserFavoriteBoycott?.length > 0,
  };
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
    const orderBy = (req.query.orderBy as string) ?? "createdAt";
    const userIdFromQuery = req.query.userId ? parseInt(req.query.userId as string, 10) : null;
    const userId: number | null = (req as any).user?.id ?? userIdFromQuery ?? null;

    const orderClause =
      orderBy === "votes"
        ? { VotesInFavor: "desc" as const }
        : { PublicationDate: "desc" as const };

    const where = { BoycottState: { StateName: "Active" }, DeletedByUser: false };

    const [boycotts, total] = await Promise.all([
      prisma.boycott.findMany({
        where,
        select: buildSelect(userId),
        orderBy: orderClause,
        skip: saltar,
        take: tamano,
      }),
      prisma.boycott.count({ where }),
    ]);

    const data = await Promise.all(boycotts.map((b) => mapBoycottToFrontend(b, userId)));

    res.json({ ok: true, total, pagina, tamano, totalPaginas: Math.ceil(total / tamano), data });
  } catch (error) {
    console.error("[listBoycotts]", error);
    res.status(500).json({ ok: false, mensaje: "Internal server error" });
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
 *   orderBy         - "createdAt" | "votes" | "title" | "entityName" | "relevance"
 *   orderDirection  - "asc" | "desc" (por defecto "desc")
 */
export async function buscarBoycotts(req: Request, res: Response): Promise<void> {
  try {
    // ── Paginación compatible con page/pageSize del frontend ──────────────
    const page   = Math.max(1, parseInt((req.query.page  as string) ?? '1',  10) || 1);
    const size   = Math.min(50, parseInt((req.query.pageSize as string) ?? '10', 10) || 10);
    const saltar = (page - 1) * size;

    // ── Usuario ───────────────────────────────────────────────────────────
    const userIdFromQuery = req.query.userId ? parseInt(req.query.userId as string, 10) : null;
    const userId: number | null = (req as any).user?.id ?? userIdFromQuery ?? null;

    // ── Parámetros de búsqueda y filtros ─────────────────────────────────
    const {
      q,
      categoryId,
      injusticeTypeId,
      countryId,
      continentId,
      industryTypeId,
      sectorId,
      orderBy = 'createdAt',
      orderDirection = 'desc',
    } = req.query as Record<string, string | undefined>;

    // ── Filtros de entidad ────────────────────────────────────────────────
    const entityFilter: Record<string, unknown> = {};
    if (categoryId)     entityFilter.CategoryEntityID = parseInt(categoryId,     10);
    if (industryTypeId) entityFilter.IndustryTypeID   = parseInt(industryTypeId, 10);
    if (sectorId)       entityFilter.SectorID         = parseInt(sectorId,       10);

    // ── Cláusula WHERE ────────────────────────────────────────────────────
    const where: Record<string, unknown> = {
      BoycottState:  { StateName: 'Active' },
      DeletedByUser: false,
    };

    if (injusticeTypeId) where.InjusticeTypeID = parseInt(injusticeTypeId, 10);
    if (countryId)       where.CountryID       = parseInt(countryId,       10);
    if (continentId)     where.Country         = { ContinentID: parseInt(continentId, 10) };

    const tieneEntityFilter = Object.keys(entityFilter).length > 0;

    if (q && tieneEntityFilter) {
      where.AND = [
        { OR: [{ Title: { contains: q } }, { Entity: { EntityName: { contains: q } } }] },
        { Entity: entityFilter },
      ];
    } else if (q) {
      where.OR = [
        { Title:  { contains: q } },
        { Entity: { EntityName: { contains: q } } },
      ];
    } else if (tieneEntityFilter) {
      where.Entity = entityFilter;
    }

    // ── Ordenamiento ──────────────────────────────────────────────────────
    const direction = orderDirection === 'asc' ? 'asc' : 'desc';

    // "relevance" no tiene soporte nativo sin full-text index;
    // lo tratamos como ordenamiento por fecha para evitar errores de Prisma.
    const ordenClause: Record<string, unknown> =
      orderBy === 'votes'      ? { VotesInFavor: direction }         :
      orderBy === 'title'      ? { Title: direction }                :
      orderBy === 'entityName' ? { Entity: { EntityName: direction } } :
      /* createdAt | relevance | default */ { PublicationDate: direction };

    // ── Query ─────────────────────────────────────────────────────────────
    const selectBase = {
      ...buildSelect(userId),
      Entity: {
        select: {
          EntityID:       true,
          EntityName:     true,
          MongoDocumentID: true,
          CategoryEntity: { select: { CategoryName: true } },
          IndustryType:   { select: { IndustryName: true } },
          Sector:         { select: { SectorName: true } },
        },
      },
    };

    const [boycotts, total] = await Promise.all([
      prisma.boycott.findMany({
        where,
        select:  selectBase,
        orderBy: ordenClause,
        skip:    saltar,
        take:    size,
      }),
      prisma.boycott.count({ where }),
    ]);

    const data = await Promise.all(boycotts.map((b) => mapBoycottToFrontend(b, userId)));

    res.json({
      ok:          true,
      total,
      pagina:      page,
      tamano:      size,
      totalPaginas: Math.ceil(total / size),
      ordenamiento: { campo: orderBy, direccion: orderDirection },
      data,
    });
  } catch (error) {
    console.error('[buscarBoycotts]', error);
    res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
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

export async function getBoycottByIdController(req: Request, res: Response): Promise<void> {
  try {
    const id = Number.parseInt(req.params.id as string, 10);
    const userId: number | null = (req as any).user?.id ?? null;

    if (Number.isNaN(id)) {
      res.status(400).json({ ok: false, mensaje: "Invalid ID" });
      return;
    }

    const data = await obtenerBoycottPorId(id, userId);

    if (!data) {
      res.status(404).json({ ok: false, mensaje: "Boycott not found" });
      return;
    }

    res.json({ ok: true, data });
  } catch (error) {
    console.error("[getBoycottByIdController]", error);
    res.status(500).json({ ok: false, mensaje: "Internal server error" });
  }
}

export async function listarFavoritosBoycotts(req: Request, res: Response): Promise<void> {
  try {
    const userId: number | null =
      (req as any).user?.id ??
      (req.query.userId ? Number(req.query.userId) : null);

    if (!userId || Number.isNaN(userId)) {
      res.status(400).json({ ok: false, mensaje: "Falta userId para obtener favoritos" });
      return;
    }

    const favoritos = await prisma.boycott.findMany({
      where: {
        DeletedByUser: false,
        UserFavoriteBoycott: {
          some: { UserID: userId },
        },
      },
      select: buildSelect(userId),
      orderBy: { PublicationDate: "desc" },
    });

    const data = await Promise.all(favoritos.map((b) => mapBoycottToFrontend(b, userId)));

    res.json({ ok: true, total: data.length, data });
  } catch (error) {
    console.error("[listarFavoritosBoycotts]", error);
    res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
}