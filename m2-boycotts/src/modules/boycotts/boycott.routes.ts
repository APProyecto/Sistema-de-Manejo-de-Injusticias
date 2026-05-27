import { Router } from "express";
import { listarBoycotts, buscarBoycotts, obtenerFiltros } from "./boycott.controller";

/*
  Rutas:boycott.routes.ts
  Descripción: Define las rutas para listado, búsqueda y catálogos de filtro de boycotts.
  Autor: Persona 2 -M2 Boycotts
*/

const router = Router();

// GET /api/boycotts           — lista paginada de boycotts activos
router.get("/", listarBoycotts);

// GET /api/boycotts/filters   — catálogos para los dropdowns de filtro
router.get("/filters", obtenerFiltros);

// GET /api/boycotts/search    — búsqueda con filtros combinados
router.get("/search", buscarBoycotts);

export default router;