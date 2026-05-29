import { Router } from "express";
import { getByEntity } from "./tracking.controller";

const router = Router();

router.get("/by-entity", getByEntity);

export default router;
