import { Router } from "express";
import {
  dashboardSummary,
  immediateActionAlerts,
  platformKpis,
  industriesMostBoycotts,
  boycottsByInjustice,
  //debugReportData,
} from "./dashboard.controller";

const router = Router();

router.get("/dashboard-summary", dashboardSummary);
router.get("/immediate-action-alerts", immediateActionAlerts);
router.get("/platform-kpis", platformKpis);
router.get("/industries-most-boycotts", industriesMostBoycotts);
router.get("/boycotts-by-injustice", boycottsByInjustice);
//Diagnostics
//router.get("/debug-report-data", debugReportData);

export default router;