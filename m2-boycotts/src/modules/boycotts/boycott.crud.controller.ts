import { Request, Response } from "express";
import {
  agregarFavoritoBoycott,
  actualizarBoycott,
  cambiarEstadoBoycott,
  crearBoycott,
  listarMisBoycotts,
  obtenerBoycottPorId,
  quitarFavoritoBoycott,
  reportarBoycott,
  votarBoycott,
} from "./boycott.service";

/*
  Controlador: boycott.crud.controller.ts
  Descripcion: maneja el CRUD principal de boycotts del usuario general.
               Cubre: crear, obtener por id, actualizar, eliminacion logica
               y listar mis boycotts.
  Autor: Persona 1 - M2 Boycotts
*/

// ─── Funciones auxiliares ─────────────────────────────────────────────────────

// convierte un valor a entero positivo o devuelve undefined
function aEnteroPositivo(valor: unknown): number | undefined {
  const numero = Number(valor);
  if (!Number.isInteger(numero) || numero <= 0) {
    return undefined;
  }
  return numero;
}

// limpia un texto y devuelve undefined si queda vacio
function aTexto(valor: unknown): string | undefined {
  if (typeof valor !== "string") {
    return undefined;
  }
  const limpio = valor.trim();
  return limpio.length > 0 ? limpio : undefined;
}

function obtenerUserId(req: Request): number | undefined {
  return (
    aEnteroPositivo((req as any).user?.id) ??
    aEnteroPositivo(req.body?.userId) ??
    aEnteroPositivo(req.body?.usuarioId) ??
    aEnteroPositivo(req.query?.userId)
  );
}

// ─── Crear boycott ─────────────────────────────────────────────────────────────

/**
 * POST /api/boycotts
 * Body: title, description, creatorId, entityId, countryId, injusticeTypeId,
 *       boycottStateId, y opcionales creatorUsername y caseNumber.
 */
export async function crearBoycottHandler(req: Request, res: Response): Promise<void> {
  try {
    const title = aTexto(req.body?.title);
    const description = aTexto(req.body?.description);
    const creatorId = aEnteroPositivo(req.body?.creatorId);
    const entityId = aEnteroPositivo(req.body?.entityId);
    const countryId = aEnteroPositivo(req.body?.countryId);
    const injusticeTypeId = aEnteroPositivo(req.body?.injusticeTypeId);
    const boycottStateId = aEnteroPositivo(req.body?.boycottStateId);
    const creatorUsername = aTexto(req.body?.creatorUsername);
    const caseNumber = aEnteroPositivo(req.body?.caseNumber);

    if (
      !title ||
      !description ||
      !creatorId ||
      !entityId ||
      !countryId ||
      !injusticeTypeId ||
      !boycottStateId
    ) {
      res.status(400).json({
        ok: false,
        mensaje:
          "Faltan campos obligatorios: title, description, creatorId, entityId, countryId, injusticeTypeId, boycottStateId",
      });
      return;
    }

    const resultado = await crearBoycott({
      title,
      description,
      creatorId,
      creatorUsername,
      entityId,
      countryId,
      injusticeTypeId,
      boycottStateId,
      caseNumber,
    });

    res.status(201).json({
      ok: true,
      mensaje: "Boycott creado",
      data: resultado,
    });
  } catch (error) {
    console.error("[crearBoycott]", error);
    res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
}

// ─── Obtener boycott por id ──────────────────────────────────────────────────

/**
 * GET /api/boycotts/:id
 * Devuelve el detalle completo para la pantalla de detalle de boycott.
 */
export async function obtenerBoycottHandler(req: Request, res: Response): Promise<void> {
  try {
    const id = aEnteroPositivo(req.params.id);
    if (!id) {
      res.status(400).json({ ok: false, mensaje: "El ID del boycott no es valido" });
      return;
    }

    const detalle = await obtenerBoycottPorId(id);
    if (!detalle) {
      res.status(404).json({ ok: false, mensaje: "Boycott no encontrado" });
      return;
    }

    res.json({ ok: true, data: detalle });
  } catch (error) {
    console.error("[obtenerBoycott]", error);
    res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
}

// ─── Actualizar boycott ──────────────────────────────────────────────────────

/**
 * PUT /api/boycotts/:id
 * Body: usuarioId (para validar permiso) y los campos a editar.
 * Solo el creador del boycott puede editarlo.
 */
export async function actualizarBoycottHandler(req: Request, res: Response): Promise<void> {
  try {
    const id = aEnteroPositivo(req.params.id);
    if (!id) {
      res.status(400).json({ ok: false, mensaje: "El ID del boycott no es valido" });
      return;
    }

    const usuarioId = aEnteroPositivo(req.body?.usuarioId ?? req.body?.creatorId);
    if (!usuarioId) {
      res.status(400).json({ ok: false, mensaje: "Falta usuarioId para validar el permiso" });
      return;
    }

    const resultado = await actualizarBoycott(
      id,
      {
        title: aTexto(req.body?.title),
        description: aTexto(req.body?.description),
        countryId: aEnteroPositivo(req.body?.countryId),
        injusticeTypeId: aEnteroPositivo(req.body?.injusticeTypeId),
        entityId: aEnteroPositivo(req.body?.entityId),
        caseNumber: aEnteroPositivo(req.body?.caseNumber),
      },
      usuarioId
    );

    if (resultado.estado === "no_encontrado") {
      res.status(404).json({ ok: false, mensaje: "Boycott no encontrado" });
      return;
    }
    if (resultado.estado === "sin_permiso") {
      res.status(403).json({ ok: false, mensaje: "Solo el creador puede editar este boycott" });
      return;
    }

    res.json({ ok: true, mensaje: "Boycott actualizado", data: resultado.data });
  } catch (error) {
    console.error("[actualizarBoycott]", error);
    res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
}

// ─── Cambiar estado (eliminacion logica) ─────────────────────────────────────

/**
 * PATCH /api/boycotts/:id/state
 * Body: usuarioId y accion ("eliminar" | "restaurar"). Por defecto "eliminar".
 * Hace eliminacion logica, no borra el registro fisicamente.
 */
export async function cambiarEstadoBoycottHandler(req: Request, res: Response): Promise<void> {
  try {
    const id = aEnteroPositivo(req.params.id);
    if (!id) {
      res.status(400).json({ ok: false, mensaje: "El ID del boycott no es valido" });
      return;
    }

    const usuarioId = aEnteroPositivo(req.body?.usuarioId ?? req.body?.creatorId);
    if (!usuarioId) {
      res.status(400).json({ ok: false, mensaje: "Falta usuarioId para validar el permiso" });
      return;
    }

    const accion = req.body?.accion === "restaurar" ? "restaurar" : "eliminar";

    const resultado = await cambiarEstadoBoycott(id, accion, usuarioId);

    if (resultado.estado === "no_encontrado") {
      res.status(404).json({ ok: false, mensaje: "Boycott no encontrado" });
      return;
    }
    if (resultado.estado === "sin_permiso") {
      res.status(403).json({ ok: false, mensaje: "Solo el creador puede cambiar el estado de este boycott" });
      return;
    }

    res.json({
      ok: true,
      mensaje: accion === "eliminar" ? "Boycott eliminado" : "Boycott restaurado",
      data: resultado.data,
    });
  } catch (error) {
    console.error("[cambiarEstadoBoycott]", error);
    res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
}

// ─── Mis boycotts ────────────────────────────────────────────────────────────

/**
 * GET /api/boycotts/mine?creatorId=...
 * Lista los boycotts creados por el usuario.
 */
export async function misBoycottsHandler(req: Request, res: Response): Promise<void> {
  try {
    const creatorId = aEnteroPositivo(req.query.creatorId);
    if (!creatorId) {
      res.status(400).json({ ok: false, mensaje: "Falta creatorId" });
      return;
    }

    const incluirEliminados = req.query.incluirEliminados === "true";

    const data = await listarMisBoycotts(creatorId, incluirEliminados);

    res.json({ ok: true, total: data.length, data });
  } catch (error) {
    console.error("[misBoycotts]", error);
    res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
}

/**
 * POST /api/boycotts/:id/vote
 * Body: isInFavor | voto | inFavor
 */
export async function votarBoycottHandler(req: Request, res: Response): Promise<void> {
  try {
    const boycottId = aEnteroPositivo(req.params.id);
    const userId = obtenerUserId(req);
    const voto = req.body?.isInFavor ?? req.body?.voto ?? req.body?.inFavor;

    if (!boycottId) {
      res.status(400).json({ ok: false, mensaje: "El ID del boycott no es valido" });
      return;
    }

    if (!userId) {
      res.status(400).json({ ok: false, mensaje: "Falta userId para registrar el voto" });
      return;
    }

    if (typeof voto !== "boolean") {
      res.status(400).json({ ok: false, mensaje: "El voto debe ser booleano" });
      return;
    }

    const resultado = await votarBoycott(boycottId, userId, voto);

    if (resultado.estado === "no_encontrado") {
      res.status(404).json({ ok: false, mensaje: "Boycott no encontrado" });
      return;
    }

    res.json({ ok: true, votoActual: resultado.votoActual });
  } catch (error) {
    console.error("[votarBoycott]", error);
    res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
}

/**
 * POST /api/boycotts/:id/favorite
 */
export async function agregarFavoritoBoycottHandler(req: Request, res: Response): Promise<void> {
  try {
    const boycottId = aEnteroPositivo(req.params.id);
    const userId = obtenerUserId(req);

    if (!boycottId) {
      res.status(400).json({ ok: false, mensaje: "El ID del boycott no es valido" });
      return;
    }

    if (!userId) {
      res.status(400).json({ ok: false, mensaje: "Falta userId para agregar favorito" });
      return;
    }

    const resultado = await agregarFavoritoBoycott(boycottId, userId);
    if (resultado.estado === "no_encontrado") {
      res.status(404).json({ ok: false, mensaje: "Boycott no encontrado" });
      return;
    }

    res.status(201).json({ ok: true });
  } catch (error) {
    console.error("[agregarFavoritoBoycott]", error);
    res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
}

/**
 * DELETE /api/boycotts/:id/favorite
 */
export async function quitarFavoritoBoycottHandler(req: Request, res: Response): Promise<void> {
  try {
    const boycottId = aEnteroPositivo(req.params.id);
    const userId = obtenerUserId(req);

    if (!boycottId) {
      res.status(400).json({ ok: false, mensaje: "El ID del boycott no es valido" });
      return;
    }

    if (!userId) {
      res.status(400).json({ ok: false, mensaje: "Falta userId para quitar favorito" });
      return;
    }

    const resultado = await quitarFavoritoBoycott(boycottId, userId);
    if (resultado.estado === "no_encontrado") {
      res.status(404).json({ ok: false, mensaje: "Boycott no encontrado" });
      return;
    }

    res.json({ ok: true });
  } catch (error) {
    console.error("[quitarFavoritoBoycott]", error);
    res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
}

/**
 * POST /api/boycotts/:id/report
 */
export async function reportarBoycottHandler(req: Request, res: Response): Promise<void> {
  try {
    const boycottId = aEnteroPositivo(req.params.id);
    const userId = obtenerUserId(req);
    const reason = aTexto(req.body?.reason) ?? aTexto(req.body?.motivo);
    const description = aTexto(req.body?.description) ?? aTexto(req.body?.descripcion);

    if (!boycottId) {
      res.status(400).json({ ok: false, mensaje: "El ID del boycott no es valido" });
      return;
    }

    if (!userId) {
      res.status(400).json({ ok: false, mensaje: "Falta userId para reportar" });
      return;
    }

    if (!reason) {
      res.status(400).json({ ok: false, mensaje: "Falta reason para reportar" });
      return;
    }

    const resultado = await reportarBoycott(boycottId, userId, reason, description);
    if (resultado.estado === "no_encontrado") {
      res.status(404).json({ ok: false, mensaje: "Boycott no encontrado" });
      return;
    }

    res.status(201).json({ ok: true });
  } catch (error) {
    console.error("[reportarBoycott]", error);
    res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
}
