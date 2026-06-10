import { Router } from "express";
import { getAuditPublications } from "./audits.controller";

const router = Router();

//GET http://localhost:3004/api/audits/publications
router.get("/publications", getAuditPublications);

export default router;
