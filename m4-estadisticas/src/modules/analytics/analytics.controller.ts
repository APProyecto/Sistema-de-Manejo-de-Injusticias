import { Request, Response } from "express";
import * as service from "./analytics.service";

export async function usersByContinent(_req: Request, res: Response) {
  try {
    const data = await service.getUsersByContinent();
    return res.json({ total: data.length, data });
  } catch (error) {
    console.error("usersByContinent error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function countriesWithMoreFavorites(_req: Request, res: Response) {
  try {
    const data = await service.getCountriesWithMoreFavorites();
    return res.json({ total: data.length, data });
  } catch (error) {
    console.error("countriesWithMoreFavorites error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function boycottsByUserContinent(_req: Request, res: Response) {
  try {
    const data = await service.getBoycottsByUserContinent();
    return res.json({ total: data.length, data });
  } catch (error) {
    console.error("boycottsByUserContinent error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function boycottsByInjusticeCategory(_req: Request, res: Response) {
  try {
    const data = await service.getBoycottsByInjusticeCategory();
    return res.json({ total: data.length, data });
  } catch (error) {
    console.error("boycottsByInjusticeCategory error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function boycottsByInjusticeCategoryAndGender(req: Request, res: Response) {
  try {
    const genderId = Number(req.query.genderId);
    if (!genderId) {
      return res.status(400).json({ error: "genderId is required" });
    }

    const data = await service.getBoycottsByInjusticeCategoryAndGender(genderId);
    return res.json({ total: data.length, data });
  } catch (error) {
    console.error("boycottsByInjusticeCategoryAndGender error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function boycottsSummaryByInjusticeCategory(_req: Request, res: Response) {
  try {
    const data = await service.getBoycottsSummaryByInjusticeCategory();
    return res.json({ total: data.length, data });
  } catch (error) {
    console.error("boycottsSummaryByInjusticeCategory error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function companiesByBoycottCount(_req: Request, res: Response) {
  try {
    const data = await service.getCompaniesByBoycottCount();
    return res.json({ total: data.length, data });
  } catch (error) {
    console.error("companiesByBoycottCount error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function boycottsByIndustry(_req: Request, res: Response) {
  try {
    const data = await service.getBoycottsByIndustry();
    return res.json({ total: data.length, data });
  } catch (error) {
    console.error("boycottsByIndustry error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function boycottRankings(_req: Request, res: Response) {
  try {
    const data = await service.getBoycottRankings();
    return res.json({ total: data.length, data });
  } catch (error) {
    console.error("boycottRankings error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function leadingIndustryByContinent(_req: Request, res: Response) {
  try {
    const data = await service.getLeadingIndustryByContinent();
    return res.json({ total: data.length, data });
  } catch (error) {
    console.error("leadingIndustryByContinent error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function rejectedReportsByMotive(_req: Request, res: Response) {
  try {
    const data = await service.getRejectedReportsByMotive();
    return res.json({ total: data.length, data });
  } catch (error) {
    console.error("rejectedReportsByMotive error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function top5UsersByBoycotts(_req: Request, res: Response) {
  try {
    const data = await service.getTop5UsersByBoycotts();
    return res.json({ total: data.length, data });
  } catch (error) {
    console.error("top5UsersByBoycotts error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function avgResolutionTimeBoycottReports(_req: Request, res: Response) {
  try {
    const data = await service.getAvgResolutionTimeBoycottReports();
    return res.json(data);
  } catch (error) {
    console.error("avgResolutionTimeBoycottReports error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function boycottReportStatusTotals(_req: Request, res: Response) {
  try {
    const data = await service.getBoycottReportStatusTotals();
    return res.json({ total: data.length, data });
  } catch (error) {
    console.error("boycottReportStatusTotals error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}