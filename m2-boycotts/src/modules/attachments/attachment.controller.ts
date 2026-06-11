import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { getBoycottDocumentByMysqlId } from "../../../../m0-base-datos/src/services/mongoDocuments.service";

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
    const boycottId = parseInt(req.params.boycottId);

    // Validar que el ID sea un número válido
    if (isNaN(boycottId)) {
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