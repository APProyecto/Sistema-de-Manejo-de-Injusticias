import { Request, Response } from "express";
import {
  downloadFileFromGridFS,
  uploadFileToGridFS,
} from "../../../../m0-base-datos/src/services/gridfs.service";
import {
  createFileMetadata,
  getFileMetadataByMongoFileId,
} from "../../../../m0-base-datos/src/services/mongoDocuments.service";
import { buildFileMetadata } from "../../../../m0-base-datos/src/utils/fileMetadata";

/*
  Controlador: files.controller.ts
  Descripcion: maneja la carga de archivos genericos (evidencias) a GridFS.
*/

export async function uploadFileHandler(req: Request, res: Response): Promise<void> {
  try {
    if (!req.file) {
      res.status(400).json({ ok: false, mensaje: "No se envio ningun archivo (campo 'file')" });
      return;
    }

    const mongoFileId = await uploadFileToGridFS(
      req.file.originalname,
      req.file.buffer,
      req.file.mimetype
    );

    const metadata = buildFileMetadata(
      req.file.originalname,
      req.file.size,
      req.file.mimetype,
      mongoFileId
    );

    await createFileMetadata(metadata);

    res.status(201).json({
      ok: true,
      data: {
        mongoFileId: String(metadata.mongoFileId ?? ""),
        gridFsId: String(metadata.gridFsId ?? ""),
        filename: metadata.fileName,
        fileName: metadata.fileName,
        contentType: metadata.contentType ?? req.file.mimetype,
        size: metadata.fileSize ?? req.file.size,
        fileSize: metadata.fileSize ?? req.file.size,
      },
    });
  } catch (error) {
    console.error("[uploadFileHandler]", error);
    res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
}

export async function downloadFileHandler(req: Request, res: Response): Promise<void> {
  try {
    const fileId = String(req.params.fileId ?? "").trim();
    if (!fileId) {
      res.status(400).json({ ok: false, mensaje: "fileId invalido" });
      return;
    }

    const metadata = await getFileMetadataByMongoFileId(fileId);
    const buffer = await downloadFileFromGridFS(fileId);
    const fileName = metadata?.fileName ?? `evidence-${fileId}`;
    const contentType = metadata?.contentType ?? "application/octet-stream";

    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.send(buffer);
  } catch (error) {
    console.error("[downloadFileHandler]", error);
    res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
}
