import {
  Container,
  Typography,
  Card,
  Box,
  useTheme,
  Divider,
  Grid,
} from '@mui/material';
import { StatisticsStyles } from '../styles/StatisticsStyles';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState, type ReactNode } from 'react';

const API_BASE_URL = 'http://localhost:3004/api';

type PlatformKpisResponse = {
  ok: boolean;
  data: {
    totalUsers: number;
    historicalBoycotts: number;
    globalPendingReports: number;
    pendingBoycottReports: number;
    pendingCommentReports: number;
    totalFavorites: number;
  };
};

type ApiListResponse<T> = {
  total: number;
  data: T[];
};

type UsersByRegionItem = {
  continent: string;
  total: number;
};

type IndustryItem = {
  industry: string;
  total: number;
};

type FavoritesByCountryItem = {
  country: string;
  total: number;
};

type CategoryItem = {
  category: string;
  total: number;
  percentage?: number;
};

type RejectedMotiveItem = {
  motive: string;
  total: number;
};

type LeadingIndustryItem = {
  continent: string;
  industry: string;
  total: number;
};

type CompanyBoycottItem = {
  company: string;
  total: number;
};

type TopUserItem = {
  userId: number;
  username: string;
  total: number;
};

type BoycottRankingItem = {
  boycottId: number;
  title: string;
  publicationDate: string;
  company: string;
  votesInFavor: number;
  votesAgainst: number;
  avgScore: number;
};

type AvgResolutionTimeResponse = {
  avgDays: number;
};

type ReportStatusItem = {
  status: string;
  total: number;
};

type PieCategoryData = {
  id: number;
  label: string;
  value: number;
  percentage?: number;
  categoryName?: string;
};

export default function Statistics() {
  const theme = useTheme();

  const red = "#E74C3C";
  const blue = "#3498DB";
  const orange = "#E67E22";
  const purple = "#9B59B6";
  const lightGreen = "#58D68D";

  const [favoritesByCategoryMale, setFavoritesByCategoryMale] = useState<
    PieCategoryData[]
  >([]);

  const [favoritesByCategoryFemale, setFavoritesByCategoryFemale] = useState<
    PieCategoryData[]
  >([]);

  const [favoritesByCategoryOther, setFavoritesByCategoryOther] = useState<
    PieCategoryData[]
  >([]);

  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalBoycotts, setTotalBoycotts] = useState<number>(0);
  const [pendingReports, setPendingReports] = useState<number>(0);
  const [totalFavorites, setTotalFavorites] = useState<number>(0);

  const [usersByRegions, setUsersByRegions] = useState<
    { region: string; value: number }[]
  >([]);

  const [industriesMoreBoycotts, setIndustriesMoreBoycotts] = useState<
    { industry: string; value: number }[]
  >([]);

  const [favoritesByCountry, setFavoritesByCountry] = useState<
    { country: string; value: number }[]
  >([]);

  const [favoritesByCategory, setFavoritesByCategory] = useState<
    PieCategoryData[]
  >([]);

  const [topReasonsReportRejection, setTopReasonsReportRejection] = useState<
    { reason: string; value: number }[]
  >([]);

  const [boycottsByInjusticeCategory, setBoycottsByInjusticeCategory] =
    useState<PieCategoryData[]>([]);

  const [boycottsDistributionPerRegion, setBoycottsDistributionPerRegion] =
    useState<{ region: string; value: number }[]>([]);

  const [leadingIndustryByRegion, setLeadingIndustryByRegion] = useState<
    LeadingIndustryItem[]
  >([]);

  const [topCompaniesByBoycotts, setTopCompaniesByBoycotts] = useState<
    CompanyBoycottItem[]
  >([]);

  const [avgResolutionDays, setAvgResolutionDays] = useState<number>(0);

  const [topUsersByBoycotts, setTopUsersByBoycotts] = useState<TopUserItem[]>(
    [],
  );

  const [topBoycottRankings, setTopBoycottRankings] = useState<
    BoycottRankingItem[]
  >([]);

  const [approvedReports, setApprovedReports] = useState<number>(0);
  const [rejectedReports, setRejectedReports] = useState<number>(0);
  const [pendingModerationReports, setPendingModerationReports] =
    useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const abortController = new AbortController();

    const loadStatisticsData = async () => {
      try {
        const responses = await Promise.all([
          fetch(`${API_BASE_URL}/metrics/platform-kpis`, {
            signal: abortController.signal,
          }),
          fetch(`${API_BASE_URL}/analytics/users-by-continent`, {
            signal: abortController.signal,
          }),
          fetch(`${API_BASE_URL}/analytics/boycotts-by-industry`, {
            signal: abortController.signal,
          }),
          fetch(`${API_BASE_URL}/analytics/countries-with-more-favorites`, {
            signal: abortController.signal,
          }),
          fetch(`${API_BASE_URL}/analytics/boycotts-by-injustice-category`, {
            signal: abortController.signal,
          }),
          fetch(`${API_BASE_URL}/analytics/rejected-reports-by-motive`, {
            signal: abortController.signal,
          }),
          fetch(
            `${API_BASE_URL}/analytics/boycotts-summary-by-injustice-category`,
            {
              signal: abortController.signal,
            },
          ),
          fetch(`${API_BASE_URL}/analytics/boycotts-by-user-continent`, {
            signal: abortController.signal,
          }),
          fetch(`${API_BASE_URL}/analytics/leading-industry-by-continent`, {
            signal: abortController.signal,
          }),
          fetch(`${API_BASE_URL}/analytics/companies-by-boycott-count`, {
            signal: abortController.signal,
          }),
          fetch(`${API_BASE_URL}/analytics/avg-resolution-time-reports`, {
            signal: abortController.signal,
          }),
          fetch(`${API_BASE_URL}/analytics/boycott-report-status-totals`, {
            signal: abortController.signal,
          }),
          fetch(`${API_BASE_URL}/analytics/top5-users-by-boycotts`, {
            signal: abortController.signal,
          }),
          fetch(`${API_BASE_URL}/analytics/boycott-rankings`, {
            signal: abortController.signal,
          }),
          fetch(
            `${API_BASE_URL}/analytics/boycotts-by-injustice-category-gender?${new URLSearchParams(
              { genderId: "1" },
            ).toString()}`,
            { signal: abortController.signal },
          ),
          fetch(
            `${API_BASE_URL}/analytics/boycotts-by-injustice-category-gender?${new URLSearchParams(
              { genderId: "2" },
            ).toString()}`,
            { signal: abortController.signal },
          ),
          fetch(
            `${API_BASE_URL}/analytics/boycotts-by-injustice-category-gender?${new URLSearchParams(
              { genderId: "3" },
            ).toString()}`,
            { signal: abortController.signal },
          ),
        ]);

        for (const response of responses) {
          if (!response.ok) {
            throw new Error("Failed to fetch statistics data");
          }
        }

        const [
          kpisResult,
          usersByContinentResult,
          boycottsByIndustryResult,
          countriesWithMoreFavoritesResult,
          boycottsByInjusticeCategoryResult,
          rejectedReportsByMotiveResult,
          boycottsSummaryByInjusticeCategoryResult,
          boycottsByUserContinentResult,
          leadingIndustryByContinentResult,
          companiesByBoycottCountResult,
          avgResolutionTimeResult,
          boycottReportStatusTotalsResult,
          top5UsersByBoycottsResult,
          boycottRankingsResult,
          maleFavoritesByCategoryResult,
          femaleFavoritesByCategoryResult,
          otherFavoritesByCategoryResult,
        ] = await Promise.all([
          responses[0].json() as Promise<PlatformKpisResponse>,
          responses[1].json() as Promise<ApiListResponse<UsersByRegionItem>>,
          responses[2].json() as Promise<ApiListResponse<IndustryItem>>,
          responses[3].json() as Promise<
            ApiListResponse<FavoritesByCountryItem>
          >,
          responses[4].json() as Promise<ApiListResponse<CategoryItem>>,
          responses[5].json() as Promise<ApiListResponse<RejectedMotiveItem>>,
          responses[6].json() as Promise<ApiListResponse<CategoryItem>>,
          responses[7].json() as Promise<ApiListResponse<UsersByRegionItem>>,
          responses[8].json() as Promise<
            ApiListResponse<LeadingIndustryItem>
          >,
          responses[9].json() as Promise<ApiListResponse<CompanyBoycottItem>>,
          responses[10].json() as Promise<AvgResolutionTimeResponse>,
          responses[11].json() as Promise<ApiListResponse<ReportStatusItem>>,
          responses[12].json() as Promise<ApiListResponse<TopUserItem>>,
          responses[13].json() as Promise<ApiListResponse<BoycottRankingItem>>,
          responses[14].json() as Promise<ApiListResponse<CategoryItem>>,
          responses[15].json() as Promise<ApiListResponse<CategoryItem>>,
          responses[16].json() as Promise<ApiListResponse<CategoryItem>>,
        ]);

        if (kpisResult.ok) {
          setTotalUsers(kpisResult.data.totalUsers);
          setTotalBoycotts(kpisResult.data.historicalBoycotts);
          setPendingReports(kpisResult.data.globalPendingReports);
          setTotalFavorites(kpisResult.data.totalFavorites);
        }

        setUsersByRegions(
          usersByContinentResult.data.map((item) => ({
            region: item.continent,
            value: item.total,
          })),
        );

        setIndustriesMoreBoycotts(
          boycottsByIndustryResult.data.map((item) => ({
            industry: item.industry,
            value: item.total,
          })),
        );

        setFavoritesByCountry(
          countriesWithMoreFavoritesResult.data.map((item) => ({
            country: item.country,
            value: item.total,
          })),
        );

        setFavoritesByCategory(
          boycottsByInjusticeCategoryResult.data.map((item, index) => {
            const pct = item.percentage ?? 0;

            return {
              id: index + 1,
              label: `${item.category} (${pct.toFixed(2)}%)`,
              value: item.total,
              percentage: pct,
              categoryName: item.category,
            };
          }),
        );

        setFavoritesByCategoryMale(
          maleFavoritesByCategoryResult.data.map((item, index) => {
            const pct = item.percentage ?? 0;

            return {
              id: index + 1,
              label: `${item.category} (${pct.toFixed(2)}%)`,
              value: item.total,
              percentage: pct,
              categoryName: item.category,
            };
          }),
        );

        setFavoritesByCategoryFemale(
          femaleFavoritesByCategoryResult.data.map((item, index) => {
            const pct = item.percentage ?? 0;

            return {
              id: index + 1,
              label: `${item.category} (${pct.toFixed(2)}%)`,
              value: item.total,
              percentage: pct,
              categoryName: item.category,
            };
          }),
        );

        setFavoritesByCategoryOther(
          otherFavoritesByCategoryResult.data.map((item, index) => {
            const pct = item.percentage ?? 0;

            return {
              id: index + 1,
              label: `${item.category} (${pct.toFixed(2)}%)`,
              value: item.total,
              percentage: pct,
              categoryName: item.category,
            };
          }),
        );

        setTopReasonsReportRejection(
          rejectedReportsByMotiveResult.data.map((item) => ({
            reason: item.motive,
            value: item.total,
          })),
        );

        setBoycottsByInjusticeCategory(
          boycottsSummaryByInjusticeCategoryResult.data.map((item, index) => {
            const pct = item.percentage ?? 0;

            return {
              id: index + 1,
              label: `${item.category} (${pct.toFixed(2)}%)`,
              value: item.total,
              percentage: pct,
              categoryName: item.category,
            };
          }),
        );

        setBoycottsDistributionPerRegion(
          boycottsByUserContinentResult.data.map((item) => ({
            region: item.continent,
            value: item.total,
          })),
        );

        setLeadingIndustryByRegion(leadingIndustryByContinentResult.data);
        setTopCompaniesByBoycotts(
          companiesByBoycottCountResult.data.slice(0, 10),
        );
        setAvgResolutionDays(avgResolutionTimeResult.avgDays ?? 0);
        setTopUsersByBoycotts(top5UsersByBoycottsResult.data);
        setTopBoycottRankings(boycottRankingsResult.data.slice(0, 10));

        const approvedItem = boycottReportStatusTotalsResult.data.find(
          (item) =>
            item.status.toLowerCase() === "approved" ||
            item.status.toLowerCase() === "aprobado",
        );

        const rejectedItem = boycottReportStatusTotalsResult.data.find(
          (item) =>
            item.status.toLowerCase() === "rejected" ||
            item.status.toLowerCase() === "rechazado",
        );

        const pendingItem = boycottReportStatusTotalsResult.data.find(
          (item) =>
            item.status.toLowerCase() === "pending" ||
            item.status.toLowerCase() === "pendiente",
        );

        setApprovedReports(approvedItem?.total ?? 0);
        setRejectedReports(rejectedItem?.total ?? 0);
        setPendingModerationReports(pendingItem?.total ?? 0);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Statistics fetch error:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    loadStatisticsData();

    return () => {
      abortController.abort();
    };
  }, []);

  const renderNoData = () => (
    <Typography variant="body2" sx={{ mt: 2 }}>
      No data available.
    </Typography>
  );

  const cleanPieLabel = (label?: string) => {
    if (!label) return "";
    return label.replace(/\s*\(\d+(?:\.\d+)?%\)$/, "");
  };

  const renderScrollableChart = (chart: ReactNode) => (
    <Box sx={StatisticsStyles.ChartScroll()}>
      <Box sx={StatisticsStyles.ChartInner()}>{chart}</Box>
    </Box>
  );

  const renderKpiCard = (
    label: string,
    value: number | string,
    icon: ReactNode,
  ) => (
    <Card sx={StatisticsStyles.CardGraphic(theme)}>
      <Box sx={StatisticsStyles.KpiCardContent()}>
        <Box sx={StatisticsStyles.KpiTextBox()}>
          <Box
            sx={{
              ...(StatisticsStyles.LabelBox() as object),
              pl: 0,
              pt: 0,
            }}
          >
            <Typography variant="h6" sx={StatisticsStyles.TopLabel(theme)}>
              {label}
            </Typography>
          </Box>

          <Box
            sx={{
              ...(StatisticsStyles.LabelBox() as object),
              pl: 0,
              pt: 0,
            }}
          >
            <Typography
              variant="h4"
              sx={StatisticsStyles.TopLabelNumber(theme)}
            >
              {loading ? "..." : value}
            </Typography>
          </Box>
        </Box>

        {icon}
      </Box>
    </Card>
  );

  const renderChartCard = (
    title: string,
    hasData: boolean,
    chart: ReactNode,
  ) => (
    <Card sx={StatisticsStyles.CardGraphic(theme)}>
      <Box sx={StatisticsStyles.BoxGraphic(theme)}>
        <Box sx={StatisticsStyles.LabelBox()}>
          <Typography variant="h6" sx={StatisticsStyles.LabelGraphic(theme)}>
            {title}
          </Typography>
        </Box>

        {hasData ? renderScrollableChart(chart) : renderNoData()}
      </Box>
    </Card>
  );

  const renderPieChart = (data: PieCategoryData[]) => (
    <PieChart
      series={[
        {
          data,
          outerRadius: 100,
          arcLabel: (item) => cleanPieLabel(item.label),
          arcLabelMinAngle: 15,
        },
      ]}
      sx={{
        "& .MuiChartsTooltip-cell": {
          color: theme.palette.background.default,
        },
      }}
      height={300}
    />
  );

  return (
    <Container maxWidth={false} sx={StatisticsStyles.Container(theme)}>
      <Box sx={StatisticsStyles.HeaderBox()}>
        <Divider
          orientation="vertical"
          flexItem
          sx={StatisticsStyles.Divider(theme)}
        />

        <Typography variant="h6" sx={{ fontWeight: "bold", my: "auto" }}>
          Statistics
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          {renderKpiCard(
            "Total users",
            totalUsers,
            <PeopleAltIcon
              sx={{
                ...(StatisticsStyles.KpiIcon() as object),
                color: theme.palette.primary.main,
              }}
            />,
          )}
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          {renderKpiCard(
            "Total boycotts",
            totalBoycotts,
            <TrendingUpIcon
              sx={{
                ...(StatisticsStyles.KpiIcon() as object),
                color: orange,
              }}
            />,
          )}
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          {renderKpiCard(
            "Pending reports",
            pendingReports,
            <ReportProblemIcon
              sx={{
                ...(StatisticsStyles.KpiIcon() as object),
                color: red,
              }}
            />,
          )}
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          {renderKpiCard(
            "Total favorites",
            totalFavorites,
            <StarBorderIcon
              sx={{
                ...(StatisticsStyles.KpiIcon() as object),
                color: blue,
              }}
            />,
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          {renderChartCard(
            "a. User distribution by region",
            usersByRegions.length > 0,
            <BarChart
              dataset={usersByRegions}
              xAxis={[{ scaleType: "band", dataKey: "region" }]}
              series={[
                { dataKey: "value", color: theme.palette.primary.main },
              ]}
              height={300}
            />,
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          {renderChartCard(
            "b. Industries with most Boycotts",
            industriesMoreBoycotts.length > 0,
            <BarChart
              dataset={industriesMoreBoycotts}
              layout="horizontal"
              xAxis={[{ scaleType: "linear" }]}
              yAxis={[{ scaleType: "band", dataKey: "industry" }]}
              series={[{ dataKey: "value", color: orange }]}
              height={300}
            />,
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={StatisticsStyles.LabelBox()}>
                <Typography
                  variant="h6"
                  sx={StatisticsStyles.LabelGraphic(theme)}
                >
                  c. Top Industries with more Boycotts by region
                </Typography>
              </Box>

              <Box sx={StatisticsStyles.ElementMapBox()}>
                {leadingIndustryByRegion.length > 0
                  ? leadingIndustryByRegion.map((item, index) => (
                      <Box key={`${item.continent}-${item.industry}-${index}`}>
                        <Box sx={StatisticsStyles.ListRow()}>
                          <Box sx={StatisticsStyles.ListTextBox()}>
                            <Typography
                              variant="body1"
                              sx={StatisticsStyles.EllipsisText()}
                            >
                              {item.continent}
                            </Typography>

                            <Typography
                              variant="caption"
                              sx={StatisticsStyles.TopBoycottSubLabel(theme)}
                            >
                              {item.industry}
                            </Typography>
                          </Box>

                          <Box sx={StatisticsStyles.ListValueBox()}>
                            <Typography variant="h6" sx={{ color: red }}>
                              {item.total}
                            </Typography>
                          </Box>
                        </Box>

                        <Divider
                          orientation="horizontal"
                          sx={StatisticsStyles.Divider2(theme)}
                        />
                      </Box>
                    ))
                  : renderNoData()}
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          {renderChartCard(
            "d. Total favorites by countries",
            favoritesByCountry.length > 0,
            <BarChart
              dataset={favoritesByCountry}
              xAxis={[{ scaleType: "band", dataKey: "country" }]}
              series={[{ dataKey: "value", color: blue }]}
              height={300}
            />,
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          {renderChartCard(
            "e. Favorite Campaigns by Category",
            favoritesByCategory.length > 0,
            renderPieChart(favoritesByCategory),
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={StatisticsStyles.LabelBox()}>
                <Typography
                  variant="h6"
                  sx={StatisticsStyles.LabelGraphic(theme)}
                >
                  f. Top companies with most boycotts
                </Typography>
              </Box>

              <Box sx={StatisticsStyles.ElementMapBox()}>
                {topCompaniesByBoycotts.length > 0
                  ? topCompaniesByBoycotts.map((company, index) => (
                      <Box key={`${company.company}-${index}`}>
                        <Box sx={StatisticsStyles.ListRow()}>
                          <Typography
                            variant="h6"
                            sx={{
                              color: theme.palette.primary.main,
                              flexShrink: 0,
                            }}
                          >
                            #{index + 1}
                          </Typography>

                          <Box sx={StatisticsStyles.ListTextBox()}>
                            <Typography
                              variant="body1"
                              sx={StatisticsStyles.EllipsisText()}
                            >
                              {company.company}
                            </Typography>
                          </Box>

                          <Box sx={StatisticsStyles.ListValueBox()}>
                            <Typography variant="h6" sx={{ color: red }}>
                              {company.total}
                            </Typography>
                          </Box>
                        </Box>

                        <Divider
                          orientation="horizontal"
                          sx={StatisticsStyles.Divider2(theme)}
                        />
                      </Box>
                    ))
                  : renderNoData()}
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={StatisticsStyles.LabelBox()}>
                <Typography
                  variant="h6"
                  sx={StatisticsStyles.LabelGraphic(theme)}
                >
                  g. Moderation statistics
                </Typography>
              </Box>

              <Box sx={StatisticsStyles.ElementMapBox()}>
                <Grid container spacing={1}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Box
                      sx={{
                        ...(StatisticsStyles.SubGridBox() as object),
                        background: lightGreen,
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={StatisticsStyles.SubGridBoxText(theme)}
                      >
                        {loading ? "..." : approvedReports}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={StatisticsStyles.SubGridBoxValue(theme)}
                      >
                        Approved
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Box
                      sx={{
                        ...(StatisticsStyles.SubGridBox() as object),
                        background: red,
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={StatisticsStyles.SubGridBoxText(theme)}
                      >
                        {loading ? "..." : rejectedReports}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={StatisticsStyles.SubGridBoxValue(theme)}
                      >
                        Rejected
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Box
                      sx={{
                        ...(StatisticsStyles.SubGridBox() as object),
                        background: theme.palette.primary.main,
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={StatisticsStyles.SubGridBoxText(theme)}
                      >
                        {loading ? "..." : pendingModerationReports}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={StatisticsStyles.SubGridBoxValue(theme)}
                      >
                        Pending
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Box
                      sx={{
                        ...(StatisticsStyles.SubGridBox() as object),
                        background: theme.palette.background.default,
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={StatisticsStyles.SubGridBoxValue(theme)}
                      >
                        Average Resolution Time
                      </Typography>

                      <Typography
                        variant="h4"
                        sx={StatisticsStyles.SubGridBoxText(theme)}
                      >
                        {loading ? "..." : avgResolutionDays} Days
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          {renderChartCard(
            "h. Top Reasons for Report Rejection",
            topReasonsReportRejection.length > 0,
            <BarChart
              dataset={topReasonsReportRejection}
              layout="horizontal"
              xAxis={[{ scaleType: "linear" }]}
              yAxis={[{ scaleType: "band", dataKey: "reason" }]}
              series={[{ dataKey: "value", color: red }]}
              height={300}
            />,
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          {renderChartCard(
            "i. Boycotts by Injustice Category",
            boycottsByInjusticeCategory.length > 0,
            renderPieChart(boycottsByInjusticeCategory),
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          {renderChartCard(
            "j. Geographic Distribution of Boycotts by Region",
            boycottsDistributionPerRegion.length > 0,
            <BarChart
              dataset={boycottsDistributionPerRegion}
              xAxis={[{ scaleType: "band", dataKey: "region" }]}
              series={[{ dataKey: "value", color: purple }]}
              height={300}
            />,
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={StatisticsStyles.LabelBox()}>
                <Typography
                  variant="h6"
                  sx={StatisticsStyles.LabelGraphic(theme)}
                >
                  k. Top Usuarios con Más Boycotts Publicadas
                </Typography>
              </Box>

              <Box sx={StatisticsStyles.ElementMapBox()}>
                {topUsersByBoycotts.length > 0
                  ? topUsersByBoycotts.map((user, index) => (
                      <Box key={user.userId}>
                        <Box sx={StatisticsStyles.ListRow()}>
                          <Typography
                            variant="h6"
                            sx={{
                              color: theme.palette.primary.main,
                              flexShrink: 0,
                            }}
                          >
                            #{index + 1}
                          </Typography>

                          <Box sx={StatisticsStyles.ListTextBox()}>
                            <Typography
                              variant="body1"
                              sx={StatisticsStyles.EllipsisText()}
                            >
                              {user.username}
                            </Typography>
                          </Box>

                          <Box sx={StatisticsStyles.ListValueBox()}>
                            <Typography variant="h6" sx={{ color: red }}>
                              {user.total}
                            </Typography>
                          </Box>
                        </Box>

                        <Divider
                          orientation="horizontal"
                          sx={StatisticsStyles.Divider2(theme)}
                        />
                      </Box>
                    ))
                  : renderNoData()}
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={StatisticsStyles.LabelBox()}>
                <Typography
                  variant="h6"
                  sx={StatisticsStyles.LabelGraphic(theme)}
                >
                  n. Top boycotts with best rating
                </Typography>
              </Box>

              <Box sx={StatisticsStyles.ElementMapBox()}>
                {topBoycottRankings.length > 0
                  ? topBoycottRankings.map((boycott) => (
                      <Box key={boycott.boycottId}>
                        <Box sx={StatisticsStyles.ListRow()}>
                          <Box sx={StatisticsStyles.ListTextBox()}>
                            <Typography
                              variant="body2"
                              sx={StatisticsStyles.EllipsisText()}
                            >
                              {boycott.title}
                            </Typography>

                            <Typography
                              variant="caption"
                              sx={StatisticsStyles.TopBoycottSubLabel(theme)}
                            >
                              {boycott.company}
                            </Typography>
                          </Box>

                          <Box sx={StatisticsStyles.ListValueBox()}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                              }}
                            >
                              <StarIcon
                                sx={{
                                  fontSize: 28,
                                  color: theme.palette.primary.main,
                                }}
                              />

                              <Typography
                                variant="body1"
                                sx={{
                                  color: theme.palette.primary.main,
                                  textAlign: "right",
                                }}
                              >
                                {boycott.avgScore}%
                              </Typography>
                            </Box>

                            <Typography
                              variant="body2"
                              sx={{
                                color: theme.palette.grey[200],
                                textAlign: "right",
                              }}
                            >
                              {new Date(
                                boycott.publicationDate,
                              ).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Box>

                        <Divider
                          orientation="horizontal"
                          sx={StatisticsStyles.Divider2(theme)}
                        />
                      </Box>
                    ))
                  : renderNoData()}
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          {renderChartCard(
            "o. Favorite campaigns by category Male",
            favoritesByCategoryMale.length > 0,
            renderPieChart(favoritesByCategoryMale),
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          {renderChartCard(
            "p. Favorite campaigns by category Female",
            favoritesByCategoryFemale.length > 0,
            renderPieChart(favoritesByCategoryFemale),
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          {renderChartCard(
            "q. Favorite campaigns by category Other",
            favoritesByCategoryOther.length > 0,
            renderPieChart(favoritesByCategoryOther),
          )}
        </Grid>
      </Grid>
    </Container>
  );
}