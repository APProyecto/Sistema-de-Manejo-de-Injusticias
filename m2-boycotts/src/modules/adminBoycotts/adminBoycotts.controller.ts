import type { Request, Response } from "express";
import {
  addAdminFavorite,
  createAdminBoycott,
  getAdminBoycottDetail,
  listAdminBoycottAttachments,
  listAdminBoycotts,
  listAdminBoycottsByCreator,
  listAdminFavorites,
  removeAdminFavorite,
  type AdminBoycottSort,
} from "./adminBoycotts.service";

const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 12;

function parsePositiveInt(value: unknown, fallback: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }
  return Math.floor(parsed);
}

function parseOptionalInt(value: unknown) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return undefined;
  }
  return Math.floor(parsed);
}

function parseText(value: unknown) {
  if (typeof value !== "string") {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function parseBool(value: unknown, fallback = false) {
  if (value === "true" || value === true) {
    return true;
  }
  if (value === "false" || value === false) {
    return false;
  }
  return fallback;
}

function parseSort(value: unknown): AdminBoycottSort {
  if (value === "created" || value === "relevance" || value === "activity") {
    return value;
  }
  return "created";
}

function buildPagination(page: number, size: number, total: number) {
  return {
    page,
    limit: size,
    total,
    pages: total === 0 ? 0 : Math.ceil(total / size),
  };
}

export async function getAdminBoycotts(req: Request, res: Response) {
  try {
    const page = parsePositiveInt(req.query.page, DEFAULT_PAGE);
    const size = parsePositiveInt(req.query.size, DEFAULT_SIZE);

    const result = await listAdminBoycotts({
      page,
      size,
      sort: parseSort(req.query.sort ?? req.query.orden),
      includeDeleted: parseBool(req.query.includeDeleted, true),
      q: parseText(req.query.q ?? req.query.texto),
      stateId: parseOptionalInt(req.query.stateId ?? req.query.estadoId),
      state: parseText(req.query.state ?? req.query.estado),
      creatorId: parseOptionalInt(req.query.creatorId ?? req.query.creador),
      checkedBy: parseOptionalInt(req.query.checkedBy),
      countryId: parseOptionalInt(req.query.countryId ?? req.query.pais),
      injusticeTypeId: parseOptionalInt(
        req.query.injusticeTypeId ?? req.query.tipo_injusticia
      ),
      entityId: parseOptionalInt(req.query.entityId ?? req.query.entidad),
    });

    return res.json({
      success: true,
      data: result.data,
      pagination: buildPagination(result.page, result.size, result.total),
    });
  } catch (error) {
    console.error("getAdminBoycotts error:", error);

    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

export async function getAdminBoycottDetailHandler(
  req: Request,
  res: Response
) {
  const boycottId = Number(req.params.id);
  if (!Number.isFinite(boycottId) || boycottId <= 0) {
    return res.status(400).json({
      success: false,
      error: "Invalid boycott id",
    });
  }

  try {
    const detail = await getAdminBoycottDetail(boycottId);

    if (!detail) {
      return res.status(404).json({
        success: false,
        error: "Boycott not found",
      });
    }

    return res.json({
      success: true,
      data: detail,
    });
  } catch (error) {
    console.error("getAdminBoycottDetail error:", error);

    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

export async function createAdminBoycottHandler(req: Request, res: Response) {
  try {
    const title = parseText(req.body?.title);
    const description = parseText(req.body?.description);
    const creatorId = parseOptionalInt(req.body?.creatorId);
    const creatorUsername = parseText(req.body?.creatorUsername);
    const entityId = parseOptionalInt(req.body?.entityId);
    const countryId = parseOptionalInt(req.body?.countryId);
    const injusticeTypeId = parseOptionalInt(req.body?.injusticeTypeId);
    const boycottStateId = parseOptionalInt(req.body?.boycottStateId);
    const caseNumber = parseOptionalInt(req.body?.caseNumber);

    if (
      !title ||
      !description ||
      !creatorId ||
      !entityId ||
      !countryId ||
      !injusticeTypeId ||
      !boycottStateId
    ) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    const result = await createAdminBoycott({
      title,
      description,
      creatorId,
      creatorUsername: creatorUsername ?? undefined,
      entityId,
      countryId,
      injusticeTypeId,
      boycottStateId,
      caseNumber: caseNumber ?? undefined,
    });

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("createAdminBoycott error:", error);

    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

export async function getAdminBoycottAttachments(
  req: Request,
  res: Response
) {
  const boycottId = Number(req.params.id);
  if (!Number.isFinite(boycottId) || boycottId <= 0) {
    return res.status(400).json({
      success: false,
      error: "Invalid boycott id",
    });
  }

  try {
    const attachments = await listAdminBoycottAttachments(boycottId);

    return res.json({
      success: true,
      data: attachments,
    });
  } catch (error) {
    console.error("getAdminBoycottAttachments error:", error);

    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

export async function getAdminMyBoycotts(req: Request, res: Response) {
  const creatorId = parseOptionalInt(req.query.adminId ?? req.query.creatorId);
  if (!creatorId) {
    return res.status(400).json({
      success: false,
      error: "Missing adminId",
    });
  }

  try {
    const result = await listAdminBoycottsByCreator(creatorId);

    return res.json({
      success: true,
      data: result.data,
      pagination: buildPagination(result.page, result.size, result.total),
    });
  } catch (error) {
    console.error("getAdminMyBoycotts error:", error);

    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

export async function getAdminFavorites(req: Request, res: Response) {
  const userId = parseOptionalInt(req.query.userId ?? req.query.adminId);
  if (!userId) {
    return res.status(400).json({
      success: false,
      error: "Missing userId",
    });
  }

  try {
    const favorites = await listAdminFavorites(userId);

    return res.json({
      success: true,
      data: favorites,
    });
  } catch (error) {
    console.error("getAdminFavorites error:", error);

    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

export async function addAdminFavoriteHandler(req: Request, res: Response) {
  const userId = parseOptionalInt(req.query.userId ?? req.query.adminId);
  const boycottId = Number(req.params.id);

  if (!userId || !Number.isFinite(boycottId) || boycottId <= 0) {
    return res.status(400).json({
      success: false,
      error: "Missing userId or invalid boycott id",
    });
  }

  try {
    await addAdminFavorite(userId, boycottId);

    return res.status(201).json({
      success: true,
    });
  } catch (error) {
    console.error("addAdminFavorite error:", error);

    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

export async function removeAdminFavoriteHandler(req: Request, res: Response) {
  const userId = parseOptionalInt(req.query.userId ?? req.query.adminId);
  const boycottId = Number(req.params.id);

  if (!userId || !Number.isFinite(boycottId) || boycottId <= 0) {
    return res.status(400).json({
      success: false,
      error: "Missing userId or invalid boycott id",
    });
  }

  try {
    await removeAdminFavorite(userId, boycottId);

    return res.json({
      success: true,
    });
  } catch (error) {
    console.error("removeAdminFavorite error:", error);

    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

export async function updateAdminBoycottStatePlaceholder(
  _req: Request,
  res: Response
) {
  return res.status(501).json({
    success: false,
    error: "Not implemented",
  });
}
