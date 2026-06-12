import { Router } from "express";
import multer from "multer";
import { downloadFileHandler, uploadFileHandler } from "./files.controller";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

// POST /api/upload
router.post("/", upload.single("file"), uploadFileHandler);

// GET /api/upload/:fileId
router.get("/:fileId", downloadFileHandler);

export default router;
