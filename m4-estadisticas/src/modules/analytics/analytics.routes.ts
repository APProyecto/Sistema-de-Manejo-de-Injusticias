import { Router } from "express";
import {
  usersByContinent,
  countriesWithMoreFavorites,
  boycottsByUserContinent,
  boycottsByInjusticeCategory,
  boycottsByInjusticeCategoryAndGender,
  boycottsSummaryByInjusticeCategory,
  companiesByBoycottCount,
  boycottsByIndustry,
  boycottRankings,
  leadingIndustryByContinent,
  rejectedReportsByMotive,
  top5UsersByBoycotts,
  avgResolutionTimeBoycottReports,
  boycottReportStatusTotals,

} from "./analytics.controller";

const router = Router();

router.get("/users-by-continent", usersByContinent);
router.get("/countries-with-more-favorites", countriesWithMoreFavorites);
router.get("/boycotts-by-user-continent", boycottsByUserContinent);
router.get("/boycotts-by-injustice-category", boycottsByInjusticeCategory);
router.get("/boycotts-by-injustice-category-gender", boycottsByInjusticeCategoryAndGender);
router.get("/boycotts-summary-by-injustice-category", boycottsSummaryByInjusticeCategory);

router.get("/companies-by-boycott-count", companiesByBoycottCount);
router.get("/boycotts-by-industry", boycottsByIndustry);
router.get("/boycott-rankings", boycottRankings);
router.get("/leading-industry-by-continent", leadingIndustryByContinent);
router.get("/rejected-reports-by-motive", rejectedReportsByMotive);
router.get("/top5-users-by-boycotts", top5UsersByBoycotts);
router.get("/avg-resolution-time-reports", avgResolutionTimeBoycottReports);
router.get("/boycott-report-status-totals", boycottReportStatusTotals);

export default router;