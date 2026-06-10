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

// GET http://localhost:3004/api/analytics/users-by-continent
router.get("/users-by-continent", usersByContinent);

//GET http://localhost:3004/api/analytics/countries-with-more-favorites
router.get("/countries-with-more-favorites", countriesWithMoreFavorites);

//GET http://localhost:3004/api/analytics/boycotts-by-user-continent
router.get("/boycotts-by-user-continent", boycottsByUserContinent);

//GET http://localhost:3004/api/analytics/boycotts-by-injustice-category
router.get("/boycotts-by-injustice-category", boycottsByInjusticeCategory);

//GET http://localhost:3004/api/analytics/boycotts-by-injustice-category-gender
router.get("/boycotts-by-injustice-category-gender", boycottsByInjusticeCategoryAndGender);

//GET http://localhost:3004/api/analytics/boycotts-summary-by-injustice-category
router.get("/boycotts-summary-by-injustice-category", boycottsSummaryByInjusticeCategory);

//GET http://localhost:3004/api/analytics/companies-by-boycott-count
router.get("/companies-by-boycott-count", companiesByBoycottCount);

//GET http://localhost:3004/api/analytics/boycotts-by-industry
router.get("/boycotts-by-industry", boycottsByIndustry);

//GET http://localhost:3004/api/analytics/boycott-rankings
router.get("/boycott-rankings", boycottRankings);

//GET http://localhost:3004/api/analytics/leading-industry-by-continent
router.get("/leading-industry-by-continent", leadingIndustryByContinent);

//GET http://localhost:3004/api/analytics/rejected-reports-by-motive
router.get("/rejected-reports-by-motive", rejectedReportsByMotive);

//GET http://localhost:3004/api/analytics/top5-users-by-boycotts
router.get("/top5-users-by-boycotts", top5UsersByBoycotts);

//GET http://localhost:3004/api/analytics/avg-resolution-time-reports
router.get("/avg-resolution-time-reports", avgResolutionTimeBoycottReports);

//GET http://localhost:3004/api/analytics/boycott-report-status-totals
router.get("/boycott-report-status-totals", boycottReportStatusTotals);

export default router;