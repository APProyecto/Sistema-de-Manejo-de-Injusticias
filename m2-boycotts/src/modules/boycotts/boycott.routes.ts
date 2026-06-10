import { Router } from "express";
import { listarBoycotts, buscarBoycotts, obtenerFiltros } from "./boycott.controller";
import {
  actualizarBoycottHandler,
  cambiarEstadoBoycottHandler,
  crearBoycottHandler,
  misBoycottsHandler,
  obtenerBoycottHandler,
} from "./boycott.crud.controller";

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

// rutas del CRUD principal (Persona 1)
// las rutas estaticas van antes que /:id para que no las capture como id

// GET /api/boycotts/mine      — boycotts creados por el usuario
router.get("/mine", misBoycottsHandler);

// POST /api/boycotts          — crear un boycott
router.post("/", crearBoycottHandler);

// GET /api/boycotts/:id       — detalle de un boycott
router.get("/:id", obtenerBoycottHandler);

// PUT /api/boycotts/:id       — editar un boycott (solo el creador)
router.put("/:id", actualizarBoycottHandler);

// PATCH /api/boycotts/:id/state — eliminacion logica o restaurar (solo el creador)
router.patch("/:id/state", cambiarEstadoBoycottHandler);

export default router;