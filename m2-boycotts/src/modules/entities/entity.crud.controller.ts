// ── entity.crud.controller.ts ─────────────────────────────────────────────────

import { Request, Response } from "express";
import {
  actualizarEntidad,
  buscarEntidades,
  crearEntidad,
  eliminarEntidad,
  obtenerEntidadPorId,
  obtenerTodasEntidades,
} from "./entity.service";

/*
  Controlador: entity.crud.controller.ts
  Descripcion: maneja el CRUD de entidades.
*/

function aEnteroPositivo(valor: unknown): number | undefined {
  const numero = Number(valor);
  if (!Number.isInteger(numero) || numero <= 0) return undefined;
  return numero;
}

function aTexto(valor: unknown): string | undefined {
  if (typeof valor !== "string") return undefined;
  const limpio = valor.trim();
  return limpio.length > 0 ? limpio : undefined;
}

function obtenerUserId(req: Request): number | undefined {
  return (
    aEnteroPositivo((req as any).user?.id) ??
    aEnteroPositivo(req.body?.userId) ??
    aEnteroPositivo(req.query?.userId)
  );
}

// ─── Crear entidad ────────────────────────────────────────────────────────────

/**
 * POST /api/entities
 * Body: entityName, categoryEntityId, y opcionales description, industryTypeId, sectorId
 */
export async function crearEntidadHandler(req: Request, res: Response): Promise<void> {
  try {
    const entityName      = aTexto(req.body?.entityName);
    const description     = aTexto(req.body?.description);
    const categoryEntityId = aEnteroPositivo(req.body?.categoryEntityId);
    const industryTypeId  = aEnteroPositivo(req.body?.industryTypeId);
    const sectorId        = aEnteroPositivo(req.body?.sectorId);
    const createdBy       = obtenerUserId(req);

    if (!entityName || !categoryEntityId || !createdBy) {
      res.status(400).json({
        ok: false,
        mensaje: "Faltan campos obligatorios: entityName, categoryEntityId, userId",
      });
      return;
    }

    const resultado = await crearEntidad({
      entityName,
      description,
      categoryEntityId,
      industryTypeId,
      sectorId,
      createdBy,
    });

    if (resultado.estado === "duplicado") {
      res.status(409).json({ ok: false, mensaje: "Ya existe una entidad con ese nombre en esta categoria" });
      return;
    }

    if (resultado.estado === "ok") {
      console.log(resultado.data.entityId);
    }
  } catch (error) {
    console.error("[crearEntidad]", error);
    res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
}

// ─── Obtener entidad por id ───────────────────────────────────────────────────

/**
 * GET /api/entities/:id
 */
export async function obtenerEntidadHandler(req: Request, res: Response): Promise<void> {
  try {
    const id = aEnteroPositivo(req.params.id);
    if (!id) {
      res.status(400).json({ ok: false, mensaje: "El ID de la entidad no es valido" });
      return;
    }

    const detalle = await obtenerEntidadPorId(id);
    if (!detalle) {
      res.status(404).json({ ok: false, mensaje: "Entidad no encontrada" });
      return;
    }

    res.json({ ok: true, data: detalle });
  } catch (error) {
    console.error("[obtenerEntidad]", error);
    res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
}

// ─── Agrega esta función en entity.crud.controller.ts ───

/**
 * GET /api/entities
 * Query params:
 *   - page: número de página (default: 1)
 *   - limit: items por página (default: 10, max: 50)
 *   - search: búsqueda por nombre
 *   - categoryEntityId: filtrar por categoría
 *   - industryTypeId: filtrar por industria
 *   - sectorId: filtrar por sector
 *   - sortBy: EntityName | EntityID | CreatedAt | NumberBoycotts
 *   - sortOrder: asc | desc
 */
export async function obtenerTodasEntidadesHandler(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const page = aEnteroPositivo(req.query.page) ?? 1;
    const limit = aEnteroPositivo(req.query.limit) ?? 10;
    const search = aTexto(req.query.search);
    const categoryEntityId = aEnteroPositivo(req.query.categoryEntityId);
    const industryTypeId = aEnteroPositivo(req.query.industryTypeId);
    const sectorId = aEnteroPositivo(req.query.sectorId);
    const sortBy = req.query.sortBy as
      | "EntityName"
      | "EntityID"
      | "CreatedAt"
      | "NumberBoycotts"
      | undefined;
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    const resultado = await obtenerTodasEntidades({
      page,
      limit,
      search,
      categoryEntityId,
      industryTypeId,
      sectorId,
      sortBy: sortBy ?? "EntityName",
      sortOrder,
    });

    res.json({
      ok: true,
      ...resultado,
    });
  } catch (error) {
    console.error("[obtenerTodasEntidades]", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error interno del servidor",
    });
  }
}

// ─── Actualizar entidad ───────────────────────────────────────────────────────

/**
 * PUT /api/entities/:id
 * Body: campos a editar y userId
 */
export async function actualizarEntidadHandler(req: Request, res: Response): Promise<void> {
  try {
    const id = aEnteroPositivo(req.params.id);
    if (!id) {
      res.status(400).json({ ok: false, mensaje: "El ID de la entidad no es valido" });
      return;
    }

    const userId = obtenerUserId(req);
    if (!userId) {
      res.status(400).json({ ok: false, mensaje: "Falta userId" });
      return;
    }

    const resultado = await actualizarEntidad(
      id,
      {
        entityName:       aTexto(req.body?.entityName),
        description:      aTexto(req.body?.description),
        categoryEntityId: aEnteroPositivo(req.body?.categoryEntityId),
        industryTypeId:   aEnteroPositivo(req.body?.industryTypeId),
        sectorId:         aEnteroPositivo(req.body?.sectorId),
      },
      userId
    );

    if (resultado.estado === "no_encontrado") {
      res.status(404).json({ ok: false, mensaje: "Entidad no encontrada" });
      return;
    }
    if (resultado.estado === "duplicado") {
      res.status(409).json({ ok: false, mensaje: "Ya existe una entidad con ese nombre en esta categoria" });
      return;
    }

    res.json({ ok: true, mensaje: "Entidad actualizada", data: resultado.data });
  } catch (error) {
    console.error("[actualizarEntidad]", error);
    res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
}

// ─── Eliminar entidad ─────────────────────────────────────────────────────────

/**
 * DELETE /api/entities/:id
 */
export async function eliminarEntidadHandler(req: Request, res: Response): Promise<void> {
  try {
    const id = aEnteroPositivo(req.params.id);
    if (!id) {
      res.status(400).json({ ok: false, mensaje: "El ID de la entidad no es valido" });
      return;
    }

    const resultado = await eliminarEntidad(id);
    if (resultado.estado === "no_encontrado") {
      res.status(404).json({ ok: false, mensaje: "Entidad no encontrada" });
      return;
    }

    res.json({ ok: true, mensaje: "Entidad eliminada" });
  } catch (error) {
    console.error("[eliminarEntidad]", error);
    res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
}

// ─── Buscar entidades ─────────────────────────────────────────────────────────

/**
 * GET /api/entities/search?q=...&categoryEntityId=...&industryTypeId=...&sectorId=...
 */
export async function buscarEntidadesHandler(req: Request, res: Response): Promise<void> {
  try {
    const q               = aTexto(req.query.q) ?? "";
    const categoryEntityId = aEnteroPositivo(req.query.categoryEntityId);
    const industryTypeId  = aEnteroPositivo(req.query.industryTypeId);
    const sectorId        = aEnteroPositivo(req.query.sectorId);

    const data = await buscarEntidades(q, categoryEntityId, industryTypeId, sectorId);

    res.json({ ok: true, total: data.length, data });
  } catch (error) {
    console.error("[buscarEntidades]", error);
    res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
}