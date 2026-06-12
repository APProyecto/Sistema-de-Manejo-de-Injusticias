import { Router } from "express";
import { agregarAdjuntos, obtenerAdjuntos } from "./attachment.controller";
 
/*
  Rutas: attachment.routes.ts
  Descripción: Define las rutas para los adjuntos de un boycott.
  Autor: Persona 2 - M2 Boycotts
*/
 
const router = Router({ mergeParams: true });
 
// GET /api/boycotts/:boycottId/attachments — metadatos de adjuntos de un boycott
router.get("/", obtenerAdjuntos);

// POST /api/boycotts/:boycottId/attachments — agrega evidencias al boycott
router.post("/", agregarAdjuntos);
 
export default router;
 
