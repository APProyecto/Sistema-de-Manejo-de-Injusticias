import { Router } from "express";
import { getAuditPublications } from "./audits.controller";

const router = Router();

router.get("/publications", getAuditPublications);

export default router;
