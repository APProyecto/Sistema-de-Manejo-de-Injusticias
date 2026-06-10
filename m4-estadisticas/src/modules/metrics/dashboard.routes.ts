import { Router } from "express";
import {
  dashboardSummary,
  immediateActionAlerts,
  platformKpis,
  //debugReportData,
} from "./dashboard.controller";

const router = Router();

//GET http://localhost:3004/api/metrics/dashboard-summary
router.get("/dashboard-summary", dashboardSummary);

//GET http://localhost:3004/api/metrics/immediate-action-alerts
router.get("/immediate-action-alerts", immediateActionAlerts);

//GET http://localhost:3004/api/metrics/platform-kpis
router.get("/platform-kpis", platformKpis);

//Diagnostics
//router.get("/debug-report-data", debugReportData);

export default router;