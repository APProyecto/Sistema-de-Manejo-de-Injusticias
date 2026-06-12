import { Request, Response } from "express";
import {
  getDashboardSummary,
  getImmediateActionAlerts,
  getPlatformKpis,
  getIndustriesWithMostBoycotts,
  getBoycottsByInjusticeCategory,
  //getDebugReportData,
} from "./dashboard.service";

/*
  Controller: dashboardSummary.
  Description: Returns the main quick summary for the initial dashboard.
*/
export async function dashboardSummary(_req: Request, res: Response) {
  try {
    const data = await getDashboardSummary();

    return res.json({
      ok: true,
      data,
    });
  } catch (error) {
    console.error("dashboardSummary error:", error);

    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
}

/*
  Controller: immediateActionAlerts.
  Description: Returns entities with reputational crisis indicators based on reports.
*/
export async function immediateActionAlerts(_req: Request, res: Response) {
  try {
    const data = await getImmediateActionAlerts();

    return res.json({
      ok: true,
      data,
    });
  } catch (error) {
    console.error("immediateActionAlerts error:", error);

    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
}

/*
  Controller: platformKpis.
  Description: Returns global platform KPIs for the statistics dashboard.
*/
export async function platformKpis(_req: Request, res: Response) {
  try {
    const data = await getPlatformKpis();

    return res.json({
      ok: true,
      data,
    });
  } catch (error) {
    console.error("platformKpis error:", error);

    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
}

/*
  Controller: industriesMostBoycotts.
  Description: Returns the industries ranked by number of boycotts.
*/
export async function industriesMostBoycotts(_req: Request, res: Response) {
  try {
    const data = await getIndustriesWithMostBoycotts();

    return res.json({
      ok: true,
      data,
    });
  } catch (error) {
    console.error("industriesMostBoycotts error:", error);

    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
}

/*
  Controller: boycottsByInjustice.
  Description: Returns the number and percentage of boycotts per injustice category.
*/
export async function boycottsByInjustice(_req: Request, res: Response) {
  try {
    const data = await getBoycottsByInjusticeCategory();

    return res.json({
      ok: true,
      data,
    });
  } catch (error) {
    console.error("boycottsByInjustice error:", error);

    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
}

/* Diagnostics
export async function debugReportData(_req: Request, res: Response) {
  try {
    const data = await getDebugReportData();

    return res.json({
      ok: true,
      data,
    });
  } catch (error) {
    console.error("debugReportData error:", error);

    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
}*/