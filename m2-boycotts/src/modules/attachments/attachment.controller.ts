import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import {
  addEvidenceToBoycott,
  getBoycottDocumentByMysqlId,
} from "../../../../m0-base-datos/src/services/mongoDocuments.service";
import type { FileMetadata } from "../../../../m0-base-datos/src/types/mongoDocuments";

/*
  Controlador: attachment.controller.ts
  Descripción: Devuelve los metadatos de adjuntos de un boycott.
               Los archivos reales (imágenes, videos, documentos) están almacenados
               en MongoDB. Este endpoint devuelve el MongoDocumentId para que el
               frontend pueda solicitarlos al servicio de archivos en m0-base-datos.
  Autor: Persona 2 - M2 Boycotts
*/

/**
 * GET /api/boycotts/:boycottId/attachments
 * Devuelve el MongoDocumentId del boycott para que el frontend
 * pueda obtener los archivos adjuntos desde m0-base-datos.
 */
export async function obtenerAdjuntos(req: Request, res: Response): Promise<void> {
  try {
    const rawBoycottId = Array.isArray(req.params.boycottId)
      ? req.params.boycottId[0]
      : req.params.boycottId;
    const boycottId = Number.parseInt(rawBoycottId ?? "", 10);

    // Validar que el ID sea un número válido
    if (Number.isNaN(boycottId)) {
      res.status(400).json({ ok: false, mensaje: "El ID del boycott no es válido" });
      return;
    }

    // Buscar el boycott en la base de datos
    const boycott = await prisma.boycott.findUnique({
      where: { BoycottID: boycottId },
      select: {
        BoycottID: true,
        Title: true,
        MongoDocumentId: true,
      },
    });

    // Si no existe el boycott, devolver 404
    if (!boycott) {
      res.status(404).json({ ok: false, mensaje: "Boycott no encontrado" });
      return;
    }

    const documento = await getBoycottDocumentByMysqlId(boycottId);

    const adjuntos = documento?.evidence
      ?.filter((item) => Boolean(item.fileName))
      .map((item) => ({
        id: String(item.mongoFileId ?? item.gridFsId ?? ""),
        nombre: item.fileName,
        tipo: item.contentType ?? null,
        tamano: item.fileSize ?? null,
      }))
      .filter((item) => item.id.length > 0) ?? [];

    res.json({
      ok: true,
      data: adjuntos,
    });
    
  } catch (error) {
    console.error("[obtenerAdjuntos]", error);
    res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
}

function normalizarMetadata(valor: unknown): FileMetadata | null {
  if (!valor || typeof valor !== "object") return null;

  const source = valor as Record<string, unknown>;
  const fileName =
    (typeof source.fileName === "string" && source.fileName.trim()) ||
    (typeof source.filename === "string" && source.filename.trim()) ||
    "";

  const mongoFileIdRaw = source.mongoFileId ?? source.gridFsId;
  const mongoFileId =
    typeof mongoFileIdRaw === "string" || typeof mongoFileIdRaw === "number"
      ? String(mongoFileIdRaw)
      : "";

  if (!fileName || !mongoFileId) return null;

  const rawSize = source.fileSize ?? source.size;
  let fileSize: number | undefined;
  if (typeof rawSize === "number") {
    fileSize = rawSize;
  } else if (typeof rawSize === "string") {
    fileSize = Number(rawSize);
  }

  const contentType =
    typeof source.contentType === "string" ? source.contentType : undefined;

  return {
    fileName,
    fileSize: Number.isFinite(fileSize) ? fileSize : undefined,
    contentType,
    mongoFileId,
    gridFsId: mongoFileId,
  };
}

/**
 * POST /api/boycotts/:boycottId/attachments
 * Body: { evidence: FileMetadata[] }
 */
export async function agregarAdjuntos(req: Request, res: Response): Promise<void> {
  try {
    const rawBoycottId = Array.isArray(req.params.boycottId)
      ? req.params.boycottId[0]
      : req.params.boycottId;
    const boycottId = Number.parseInt(rawBoycottId ?? "", 10);

    if (Number.isNaN(boycottId)) {
      res.status(400).json({ ok: false, mensaje: "El ID del boycott no es valido" });
      return;
    }

    const boycott = await prisma.boycott.findUnique({
      where: { BoycottID: boycottId },
      select: { BoycottID: true },
    });

    if (!boycott) {
      res.status(404).json({ ok: false, mensaje: "Boycott no encontrado" });
      return;
    }

    const rawEvidence: unknown[] = [];
    if (Array.isArray(req.body?.evidence)) {
      rawEvidence.push(...req.body.evidence);
    } else if (req.body?.evidence) {
      rawEvidence.push(req.body.evidence);
    }

    const evidence = rawEvidence
      .map((item: unknown) => normalizarMetadata(item))
      .filter((item: FileMetadata | null): item is FileMetadata => Boolean(item));

    if (!evidence.length) {
      res.status(400).json({ ok: false, mensaje: "No se recibio evidencia valida" });
      return;
    }

    for (const item of evidence) {
      await addEvidenceToBoycott(boycottId, item);
    }

    const documento = await getBoycottDocumentByMysqlId(boycottId);

    res.status(201).json({
      ok: true,
      mensaje: "Adjuntos agregados correctamente",
      data: {
        evidenceCount: documento?.evidence?.length ?? 0,
      },
    });
  } catch (error) {
    console.error("[agregarAdjuntos]", error);
    res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
}