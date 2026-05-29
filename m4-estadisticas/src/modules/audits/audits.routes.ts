import { Router } from "express";
import { getAuditPublications, getByEntity } from "./audits.controller";

const router = Router();

router.get("/publications", getAuditPublications);
router.get("/by-entity", getByEntity);

export default router;
