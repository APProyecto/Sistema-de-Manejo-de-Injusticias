import { Router } from "express";
import { getAuditPublications, getFilterOptions } from "./audits.controller";

const router = Router();

router.get("/publications", getAuditPublications);
router.get("/filter-options", getFilterOptions);

export default router;
