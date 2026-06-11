import { Router } from "express";
import { actualizarEntidadHandler, buscarEntidadesHandler, crearEntidadHandler, eliminarEntidadHandler, obtenerEntidadHandler, obtenerTodasEntidadesHandler } from "./entity.crud.controller";

/*
  Rutas:boycott.routes.ts
  Descripción: Define las rutas para listado, búsqueda y catálogos de filtro de boycotts.
  Autor: Persona 2 -M2 Boycotts
*/

const router = Router();

// GET /api/boycotts/entities/:id — entidades (indicted)
router.post("/", crearEntidadHandler);

router.get("/", obtenerTodasEntidadesHandler);

router.get("/search", buscarEntidadesHandler);
router.get("/:id", obtenerEntidadHandler);
router.put("/:id", actualizarEntidadHandler);
router.delete("/:id", eliminarEntidadHandler);

export default router;