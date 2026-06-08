import { Router } from "express";
import {
  dashboardSummary,
  immediateActionAlerts,
  platformKpis,
  //debugReportData,
} from "./dashboard.controller";

const router = Router();

router.get("/dashboard-summary", dashboardSummary);
router.get("/immediate-action-alerts", immediateActionAlerts);
router.get("/platform-kpis", platformKpis);
//Diagnostics
//router.get("/debug-report-data", debugReportData);

export default router;