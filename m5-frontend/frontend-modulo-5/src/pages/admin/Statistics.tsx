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
import { useEffect, useState } from 'react';

const API_BASE_URL = 'https://fair-boycott.sytes.net/api';

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

export default function Statistics() {
  const theme = useTheme();

  const red = '#E74C3C';
  const blue = '#3498DB';
  const orange = '#E67E22';
  const purple = '#9B59B6';
  const lightGreen = '#58D68D';

  const [favoritesByCategoryMale, setFavoritesByCategoryMale] = useState<
  { id: number; label: string; value: number }[]
>([]);

const [favoritesByCategoryFemale, setFavoritesByCategoryFemale] = useState<
  { id: number; label: string; value: number }[]
>([]);

const [favoritesByCategoryOther, setFavoritesByCategoryOther] = useState<
  { id: number; label: string; value: number }[]
>([]);

  const elementMapBoxSx = {
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5,
    mt: 1,
  };

  const divider2Sx = {
    my: 1.2,
    borderColor: theme.palette.divider,
    opacity: 0.7,
  };

  const subGridBoxValueSx = {
  color: theme.palette.secondary.main,
  fontWeight: 500,
};

  const topBoycottSubLabelSx = {
    ml: 1,
    color: theme.palette.text.secondary,
    fontSize: '0.75rem',
  };

  const subGridBoxSx = {
    borderRadius: 3,
    p: 2,
    minHeight: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const subGridBoxTextSx = {
    color: theme.palette.secondary.main,
    fontWeight: 700,
  };

  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalBoycotts, setTotalBoycotts] = useState<number>(0);
  const [pendingReports, setPendingReports] = useState<number>(0);
  const [totalFavorites, setTotalFavorites] = useState<number>(0);

  const [usersByRegions, setUsersByRegions] = useState<{ region: string; value: number }[]>([]);
  const [industriesMoreBoycotts, setIndustriesMoreBoycotts] = useState<{ industry: string; value: number }[]>([]);
  const [favoritesByCountry, setFavoritesByCountry] = useState<{ country: string; value: number }[]>([]);
const [favoritesByCategory, setFavoritesByCategory] = useState<{ id: number; label: string; value: number; percentage: number; categoryName: string }[]>([]);
  const [topReasonsReportRejection, setTopReasonsReportRejection] = useState<{ reason: string; value: number }[]>([]);
  const [boycottsByInjusticeCategory, setBoycottsByInjusticeCategory] = useState<{ id: number; label: string; value: number }[]>([]);
  const [boycottsDistributionPerRegion, setBoycottsDistributionPerRegion] = useState<{ region: string; value: number }[]>([]);

  const [leadingIndustryByRegion, setLeadingIndustryByRegion] = useState<LeadingIndustryItem[]>([]);
  const [topCompaniesByBoycotts, setTopCompaniesByBoycotts] = useState<CompanyBoycottItem[]>([]);
  const [avgResolutionDays, setAvgResolutionDays] = useState<number>(0);
  const [topUsersByBoycotts, setTopUsersByBoycotts] = useState<TopUserItem[]>([]);
  const [topBoycottRankings, setTopBoycottRankings] = useState<BoycottRankingItem[]>([]);

  
  const [approvedReports, setApprovedReports] = useState<number>(0);
  const [rejectedReports, setRejectedReports] = useState<number>(0);
  const [pendingModerationReports, setPendingModerationReports] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true);

  const formatPieLabel = (item: { label?: string; value?: number; percentage?: number }) => {
  const label = item.label ?? 'Unknown';
  const value = item.value ?? 0;
  const percentage = item.percentage ?? 0;

  return `${label} ${value} (${percentage.toFixed(2)}%)`;
};

  useEffect(() => {
    const abortController = new AbortController();

    const loadStatisticsData = async () => {
      try {
        const responses = await Promise.all([
          fetch(`${API_BASE_URL}/metrics/platform-kpis`, { signal: abortController.signal }),
          fetch(`${API_BASE_URL}/analytics/users-by-continent`, { signal: abortController.signal }),
          fetch(`${API_BASE_URL}/analytics/boycotts-by-industry`, { signal: abortController.signal }),
          fetch(`${API_BASE_URL}/analytics/countries-with-more-favorites`, { signal: abortController.signal }),
          fetch(`${API_BASE_URL}/analytics/boycotts-by-injustice-category`, { signal: abortController.signal }),
          fetch(`${API_BASE_URL}/analytics/rejected-reports-by-motive`, { signal: abortController.signal }),
          fetch(`${API_BASE_URL}/analytics/boycotts-summary-by-injustice-category`, { signal: abortController.signal }),
          fetch(`${API_BASE_URL}/analytics/boycotts-by-user-continent`, { signal: abortController.signal }),
          fetch(`${API_BASE_URL}/analytics/leading-industry-by-continent`, { signal: abortController.signal }),
          fetch(`${API_BASE_URL}/analytics/companies-by-boycott-count`, { signal: abortController.signal }),
          fetch(`${API_BASE_URL}/analytics/avg-resolution-time-reports`, { signal: abortController.signal }),
          fetch(`${API_BASE_URL}/analytics/boycott-report-status-totals`, { signal: abortController.signal }),
          fetch(`${API_BASE_URL}/analytics/top5-users-by-boycotts`, { signal: abortController.signal }),
          fetch(`${API_BASE_URL}/analytics/boycott-rankings`, { signal: abortController.signal }),
          fetch(
  `${API_BASE_URL}/analytics/boycotts-by-injustice-category-gender?${new URLSearchParams({ genderId: '1' }).toString()}`,
  { signal: abortController.signal }
),
fetch(
  `${API_BASE_URL}/analytics/boycotts-by-injustice-category-gender?${new URLSearchParams({ genderId: '2' }).toString()}`,
  { signal: abortController.signal }
),
fetch(
  `${API_BASE_URL}/analytics/boycotts-by-injustice-category-gender?${new URLSearchParams({ genderId: '3' }).toString()}`,
  { signal: abortController.signal }
),
        ]);

        for (const response of responses) {
          if (!response.ok) {
            throw new Error('Failed to fetch statistics data');
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
  responses[3].json() as Promise<ApiListResponse<FavoritesByCountryItem>>,
  responses[4].json() as Promise<ApiListResponse<CategoryItem>>,
  responses[5].json() as Promise<ApiListResponse<RejectedMotiveItem>>,
  responses[6].json() as Promise<ApiListResponse<CategoryItem>>,
  responses[7].json() as Promise<ApiListResponse<UsersByRegionItem>>,
  responses[8].json() as Promise<ApiListResponse<LeadingIndustryItem>>,
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
          }))
        );

        setIndustriesMoreBoycotts(
          boycottsByIndustryResult.data.map((item) => ({
            industry: item.industry,
            value: item.total,
          }))
        );

        setFavoritesByCountry(
          countriesWithMoreFavoritesResult.data.map((item) => ({
            country: item.country,
            value: item.total,
          }))
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
  })
);

setFavoritesByCategoryMale(
  maleFavoritesByCategoryResult.data.map((item, index) => {
    const pct = item.percentage ?? 0;
    return {
      id: index + 1,
      label: `${item.category} (${pct.toFixed(2)}%)`, // Con porcentaje para la leyenda
      value: item.total,
      percentage: pct,
    };
  })
);
setFavoritesByCategoryFemale(
  femaleFavoritesByCategoryResult.data.map((item, index) => {
    const pct = item.percentage ?? 0;
    return {
      id: index + 1,
      label: `${item.category} (${pct.toFixed(2)}%)`, // Con porcentaje para la leyenda
      value: item.total,
      percentage: pct,
    };
  })
);

        setFavoritesByCategoryOther(
          otherFavoritesByCategoryResult.data.map((item, index) => ({
            id: index + 1,
            label: item.category,
            value: item.total,
          }))
        );

        setTopReasonsReportRejection(
          rejectedReportsByMotiveResult.data.map((item) => ({
            reason: item.motive,
            value: item.total,
          }))
        );

setBoycottsByInjusticeCategory(
  boycottsSummaryByInjusticeCategoryResult.data.map((item, index) => {
    const pct = item.percentage ?? 0;
    return {
      id: index + 1,
      label: `${item.category} (${pct.toFixed(2)}%)`, // Con porcentaje para la leyenda
      value: item.total,
      percentage: pct,
    };
  })
);

        setBoycottsDistributionPerRegion(
          boycottsByUserContinentResult.data.map((item) => ({
            region: item.continent,
            value: item.total,
          }))
        );

        setLeadingIndustryByRegion(leadingIndustryByContinentResult.data);
        setTopCompaniesByBoycotts(companiesByBoycottCountResult.data.slice(0, 10));
        setAvgResolutionDays(avgResolutionTimeResult.avgDays ?? 0);
        setTopUsersByBoycotts(top5UsersByBoycottsResult.data);
        setTopBoycottRankings(boycottRankingsResult.data.slice(0, 10));

        const approvedItem = boycottReportStatusTotalsResult.data.find(
          (item) =>
            item.status.toLowerCase() === 'approved' ||
            item.status.toLowerCase() === 'aprobado'
        );

        const rejectedItem = boycottReportStatusTotalsResult.data.find(
          (item) =>
            item.status.toLowerCase() === 'rejected' ||
            item.status.toLowerCase() === 'rechazado'
        );

        const pendingItem = boycottReportStatusTotalsResult.data.find(
          (item) =>
            item.status.toLowerCase() === 'pending' ||
            item.status.toLowerCase() === 'pendiente'
        );

        setApprovedReports(approvedItem?.total ?? 0);
        setRejectedReports(rejectedItem?.total ?? 0);
        setPendingModerationReports(pendingItem?.total ?? 0);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Statistics fetch error:', error);
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

  return (
    <Container sx={{ backgroundColor: theme.palette.background.default, p: 5, overflowY: 'auto' }}>
      <Box sx={{ display: 'flex', mb: 5 }}>
        <Divider orientation="vertical" flexItem sx={{ ...StatisticsStyles.Divider(theme) }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold', my: 'auto' }}>
          Statistics
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ ...StatisticsStyles.BoxGraphic(theme) }}>
                <Box sx={{ ...StatisticsStyles.LabelBox(theme), pl: 1 }}>
                  <Typography variant="h6" sx={StatisticsStyles.TopLabel(theme)}>
                    Total users
                  </Typography>
                </Box>
                <Box sx={{ ...StatisticsStyles.LabelBox(theme), pl: 1 }}>
                  <Typography variant="h4" sx={StatisticsStyles.TopLabelNumber(theme)}>
                    {loading ? '...' : totalUsers}
                  </Typography>
                </Box>
              </Box>
              <PeopleAltIcon sx={{ m: 'auto', fontSize: 57, color: theme.palette.primary.main }} />
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ ...StatisticsStyles.BoxGraphic(theme) }}>
                <Box sx={{ ...StatisticsStyles.LabelBox(theme), pl: 1 }}>
                  <Typography variant="h6" sx={StatisticsStyles.TopLabel(theme)}>
                    Total boycotts
                  </Typography>
                </Box>
                <Box sx={{ ...StatisticsStyles.LabelBox(theme), pl: 1 }}>
                  <Typography variant="h4" sx={StatisticsStyles.TopLabelNumber(theme)}>
                    {loading ? '...' : totalBoycotts}
                  </Typography>
                </Box>
              </Box>
              <TrendingUpIcon sx={{ m: 'auto', fontSize: 57, color: orange }} />
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{ ...StatisticsStyles.CardGraphic(theme) }}>
            <Box sx={{ display: 'flex', p: 0 }}>
              <Box sx={{ ...StatisticsStyles.BoxGraphic(theme) }}>
                <Box sx={{ ...StatisticsStyles.LabelBox(theme), pl: 1 }}>
                  <Typography variant="h6" sx={StatisticsStyles.TopLabel(theme)}>
                    Pending reports
                  </Typography>
                </Box>
                <Box sx={{ ...StatisticsStyles.LabelBox(theme), pl: 1 }}>
                  <Typography variant="h4" sx={StatisticsStyles.TopLabelNumber(theme)}>
                    {loading ? '...' : pendingReports}
                  </Typography>
                </Box>
              </Box>
              <ReportProblemIcon sx={{ m: 'auto', fontSize: 57, color: red }} />
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{ ...StatisticsStyles.CardGraphic(theme) }}>
            <Box sx={{ display: 'flex', p: 0 }}>
              <Box sx={{ ...StatisticsStyles.BoxGraphic(theme) }}>
                <Box sx={{ ...StatisticsStyles.LabelBox(theme), pl: 1 }}>
                  <Typography variant="h6" sx={StatisticsStyles.TopLabel(theme)}>
                    Total favorites
                  </Typography>
                </Box>
                <Box sx={{ ...StatisticsStyles.LabelBox(theme), pl: 1 }}>
                  <Typography variant="h4" sx={StatisticsStyles.TopLabelNumber(theme)}>
                    {loading ? '...' : totalFavorites}
                  </Typography>
                </Box>
              </Box>
              <StarBorderIcon sx={{ m: 'auto', fontSize: 57, color: blue }} />
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={StatisticsStyles.LabelBox(theme)}>
                <Typography variant="h6" sx={StatisticsStyles.LabelGraphic(theme)}>
                  a. User distribution by region
                </Typography>
              </Box>
              {usersByRegions.length > 0 ? (
                <BarChart
                  dataset={usersByRegions}
                  xAxis={[{ scaleType: 'band', dataKey: 'region' }]}
                  series={[{ dataKey: 'value', color: theme.palette.primary.main }]}
                  height={300}
                />
              ) : (
                renderNoData()
              )}
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={StatisticsStyles.LabelBox(theme)}>
                <Typography variant="h6" sx={StatisticsStyles.LabelGraphic(theme)}>
                  b. Industries with most Boycotts
                </Typography>
              </Box>
              {industriesMoreBoycotts.length > 0 ? (
                <BarChart
                  dataset={industriesMoreBoycotts}
                  layout="horizontal"
                  xAxis={[{ scaleType: 'linear' }]}
                  yAxis={[{ scaleType: 'band', dataKey: 'industry' }]}
                  series={[{ dataKey: 'value', color: orange }]}
                  height={300}
                />
              ) : (
                renderNoData()
              )}
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={StatisticsStyles.LabelBox(theme)}>
                <Typography variant="h6" sx={StatisticsStyles.LabelGraphic(theme)}>
                  c. Top Industries with more Boycotts by region
                </Typography>
              </Box>

              <Box sx={elementMapBoxSx}>
                {leadingIndustryByRegion.length > 0 ? (
                  leadingIndustryByRegion.map((item, index) => (
                    <Box key={`${item.continent}-${item.industry}-${index}`}>
                      <Box sx={{ display: 'flex' }}>
                        <Box>
                          <Typography variant="body1" sx={{ ml: 1, my: 'auto' }}>
                            {item.continent}
                          </Typography>
                          <Typography variant="caption" sx={topBoycottSubLabelSx}>
                            {item.industry}
                          </Typography>
                        </Box>

                        <Box sx={{ my: 'auto', ml: 'auto', mr: 0 }}>
                          <Typography variant="h6" sx={{ color: red }}>
                            {item.total}
                          </Typography>
                        </Box>
                      </Box>
                      <Divider orientation="horizontal" sx={divider2Sx} />
                    </Box>
                  ))
                ) : (
                  renderNoData()
                )}
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={StatisticsStyles.LabelBox(theme)}>
                <Typography variant="h6" sx={StatisticsStyles.LabelGraphic(theme)}>
                  d. Total favorites by countries
                </Typography>
              </Box>
              {favoritesByCountry.length > 0 ? (
                <BarChart
                  dataset={favoritesByCountry}
                  xAxis={[{ scaleType: 'band', dataKey: 'country' }]}
                  series={[{ dataKey: 'value', color: blue }]}
                  height={300}
                />
              ) : (
                renderNoData()
              )}
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={StatisticsStyles.LabelBox(theme)}>
                <Typography variant="h6" sx={StatisticsStyles.LabelGraphic(theme)}>
                  e. Favorite Campaigns by Category
                </Typography>
              </Box>
              {favoritesByCategory.length > 0 ? (
                <PieChart
                  series={[
                    {
                      data: favoritesByCategory,
                      outerRadius: 100,
                      arcLabel: (item) => item.label ? item.label.replace(/\s*\(\d+(?:\.\d+)?%\)$/, '') : '', 
                      arcLabelMinAngle: 15,
                    },
                  ]}
                  sx={{
                    '& .MuiChartsTooltip-cell': {
                      color: theme.palette.background.default,
                    },
                  }}
                  height={300}
                />
              ) : (
                renderNoData()
              )}
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={{ ...StatisticsStyles.LabelBox(theme), pl: 2, mb: 2 }}>
                <Typography variant="h6" sx={StatisticsStyles.LabelGraphic(theme)}>
                  f. Top companies with most boycotts
                </Typography>
              </Box>

              <Box sx={elementMapBoxSx}>
                {topCompaniesByBoycotts.length > 0 ? (
                  topCompaniesByBoycotts.map((company, index) => (
                    <Box key={`${company.company}-${index}`}>
                      <Box sx={{ display: 'flex' }}>
                        <Box sx={{ display: 'flex' }}>
                          <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
                            #{index + 1}
                          </Typography>
                          <Typography variant="body1" sx={{ ml: 1, my: 'auto' }}>
                            {company.company}
                          </Typography>
                        </Box>

                        <Box sx={{ my: 'auto', ml: 'auto', mr: 0 }}>
                          <Typography variant="h6" sx={{ color: red }}>
                            {company.total}
                          </Typography>
                        </Box>
                      </Box>
                      <Divider orientation="horizontal" sx={divider2Sx} />
                    </Box>
                  ))
                ) : (
                  renderNoData()
                )}
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={{ ...StatisticsStyles.LabelBox(theme), pl: 2, mb: 2 }}>
                <Typography variant="h6" sx={StatisticsStyles.LabelGraphic(theme)}>
                  g. Moderation statistics
                </Typography>
              </Box>

              <Box sx={elementMapBoxSx}>
                <Grid container spacing={1}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ ...subGridBoxSx, background: lightGreen }}>
                      <Typography variant="h4" sx={subGridBoxTextSx}>
                        {loading ? '...' : approvedReports}
                      </Typography>
                      <Typography variant="body1" sx={subGridBoxValueSx}>
                        Approved
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ ...subGridBoxSx, background: red }}>
                      <Typography variant="h4" sx={subGridBoxTextSx}>
                        {loading ? '...' : rejectedReports}
                      </Typography>
                      <Typography variant="body1" sx={{ color: theme.palette.secondary.main }}>
                        Rejected
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ ...subGridBoxSx, background: theme.palette.primary.main }}>
                      <Typography variant="h4" sx={subGridBoxTextSx}>
                        {loading ? '...' : pendingModerationReports}
                      </Typography>
                      <Typography variant="body1" sx={{ color: theme.palette.secondary.main }}>
                        Pending
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, md: 12 }}>
                    <Box
                      sx={{
                        ...subGridBoxSx,
                        background: theme.palette.background.default,
                      }}
                    >
                      <Typography variant="body1" sx={{ color: theme.palette.secondary.main }}>
                        Average Resolution Time
                      </Typography>
                      <Typography variant="h4" sx={subGridBoxTextSx}>
                        {loading ? '...' : avgResolutionDays} Days
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Card>
        </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={StatisticsStyles.LabelBox(theme)}>
                <Typography variant="h6" sx={StatisticsStyles.LabelGraphic(theme)}>
                  h. Top Reasons for Report Rejection
                </Typography>
              </Box>
              {topReasonsReportRejection.length > 0 ? (
                <BarChart
                  dataset={topReasonsReportRejection}
                  layout="horizontal"
                  xAxis={[{ scaleType: 'linear' }]}
                  yAxis={[{ scaleType: 'band', dataKey: 'reason' }]}
                  series={[{ dataKey: 'value', color: red }]}
                  height={300}
                />
              ) : (
                renderNoData()
              )}
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={StatisticsStyles.LabelBox(theme)}>
                <Typography variant="h6" sx={StatisticsStyles.LabelGraphic(theme)}>
                  i. Boycotts by Injustice Category
                </Typography>
              </Box>
              {boycottsByInjusticeCategory.length > 0 ? (
                <PieChart
                  series={[
                    {
                      data: boycottsByInjusticeCategory,
                      outerRadius: 100,
                      // Limpia el texto para el interior del gráfico
                      arcLabel: (item) => item.label ? item.label.split(' (')[0] : '',
                    },
                  ]}
                  sx={{
                    '& .MuiChartsTooltip-cell': {
                      color: theme.palette.background.default,
                    },
                  }}
                  height={300}
                />
              ) : (
                renderNoData()
              )}
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={{ ...StatisticsStyles.LabelBox(theme), pb: 1.1 }}>
                <Typography variant="body1" sx={StatisticsStyles.LabelGraphic(theme)}>
                  j. Geographic Distribution of Boycotts by Region
                </Typography>
              </Box>
              {boycottsDistributionPerRegion.length > 0 ? (
                <BarChart
                  dataset={boycottsDistributionPerRegion}
                  xAxis={[{ scaleType: 'band', dataKey: 'region' }]}
                  series={[{ dataKey: 'value', color: purple }]}
                  height={300}
                />
              ) : (
                renderNoData()
              )}
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={StatisticsStyles.LabelBox(theme)}>
                <Typography variant="h6" sx={StatisticsStyles.LabelGraphic(theme)}>
                  k. Top Usuarios con Más Boycotts Publicadas
                </Typography>
              </Box>

              <Box sx={elementMapBoxSx}>
                {topUsersByBoycotts.length > 0 ? (
                  topUsersByBoycotts.map((user, index) => (
                    <Box key={user.userId}>
                      <Box sx={{ display: 'flex' }}>
                        <Box sx={{ display: 'flex' }}>
                          <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
                            #{index + 1}
                          </Typography>
                          <Typography variant="body1" sx={{ ml: 1, my: 'auto' }}>
                            {user.username}
                          </Typography>
                        </Box>

                        <Box sx={{ my: 'auto', ml: 'auto', mr: 0 }}>
                          <Typography variant="h6" sx={{ color: red }}>
                            {user.total}
                          </Typography>
                        </Box>
                      </Box>
                      <Divider orientation="horizontal" sx={divider2Sx} />
                    </Box>
                  ))
                ) : (
                  renderNoData()
                )}
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={{ ...StatisticsStyles.LabelBox(theme), pl: 2, mb: 2 }}>
                <Typography variant="h6" sx={StatisticsStyles.LabelGraphic(theme)}>
                  n. Top boycotts with best rating
                </Typography>
              </Box>

              <Box sx={elementMapBoxSx}>
                {topBoycottRankings.length > 0 ? (
                  topBoycottRankings.map((boycott) => (
                    <Box key={boycott.boycottId}>
                      <Box sx={{ display: 'flex' }}>
                        <Box>
                          <Box sx={{ display: 'flex' }}>
                            <Typography
                              variant="body2"
                              sx={{ ml: 1, my: 'auto', textAlign: 'left' }}
                            >
                              {boycott.title}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex' }}>
                            <Typography variant="caption" sx={topBoycottSubLabelSx}>
                              {boycott.company}
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ my: 'auto', ml: 'auto', mr: 0 }}>
                          <Box sx={{ display: 'flex' }}>
                            <StarIcon
                              sx={{
                                fontSize: 30,
                                color: theme.palette.primary.main,
                                ml: 'auto',
                                mr: 0,
                              }}
                            />
                            <Typography
                              variant="body1"
                              sx={{
                                color: theme.palette.primary.main,
                                mt: 'auto',
                                textAlign: 'right',
                                mr: 0,
                              }}
                            >
                              {boycott.avgScore}%
                            </Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{ color: theme.palette.grey[200], mb: 'auto' }}
                          >
                            {new Date(boycott.publicationDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                      <Divider orientation="horizontal" sx={divider2Sx} />
                    </Box>
                  ))
                ) : (
                  renderNoData()
                )}
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
  <Card sx={StatisticsStyles.CardGraphic(theme)}>
    <Box sx={StatisticsStyles.BoxGraphic(theme)}>
      <Box sx={StatisticsStyles.LabelBox(theme)}>
        <Typography variant="h6" sx={StatisticsStyles.LabelGraphic(theme)}>
          e. Favorite campaigns by category Male
        </Typography>
      </Box>
      {favoritesByCategoryMale.length > 0 ? (
        <PieChart
          series={[
            {
              data: favoritesByCategoryMale,
              outerRadius: 100,
              // Limpia el texto para el interior del gráfico
              arcLabel: (item) => item.label ? item.label.split(' (')[0] : '',
            },
          ]}
          sx={{
            '& .MuiChartsTooltip-cell': {
              color: theme.palette.background.default,
            },
          }}
          height={300}
        />
      ) : (
        renderNoData()
      )}
    </Box>
  </Card>
</Grid>

<Grid size={{ xs: 12, md: 6 }}>
  <Card sx={StatisticsStyles.CardGraphic(theme)}>
    <Box sx={StatisticsStyles.BoxGraphic(theme)}>
      <Box sx={StatisticsStyles.LabelBox(theme)}>
        <Typography variant="h6" sx={StatisticsStyles.LabelGraphic(theme)}>
          f. Favorite campaigns by category Female
        </Typography>
      </Box>
      {favoritesByCategoryFemale.length > 0 ? (
        <PieChart
          series={[
            {
              data: favoritesByCategoryFemale,
              outerRadius: 100,
              // Limpia el texto para el interior del gráfico
              arcLabel: (item) => item.label ? item.label.split(' (')[0] : '',
            },
          ]}
          sx={{
            '& .MuiChartsTooltip-cell': {
              color: theme.palette.background.default,
            },
          }}
          height={300}
        />
      ) : (
        renderNoData()
      )}
    </Box>
  </Card>
</Grid>


    </Container>
  );
}