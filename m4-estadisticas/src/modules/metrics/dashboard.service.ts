import { prisma } from "../../config/prisma";

const CACHE_TTL_MS = 60 * 1000;

type CacheEntry<T> = {
  data: T;
  expiresAt: number;
};

const cache = new Map<string, CacheEntry<unknown>>();

async function getOrSetCache<T>(
  key: string,
  fetchData: () => Promise<T>
): Promise<T> {
  const cached = cache.get(key) as CacheEntry<T> | undefined;
  const now = Date.now();

  if (cached && cached.expiresAt > now) {
    return cached.data;
  }

  const data = await fetchData();

  cache.set(key, {
    data,
    expiresAt: now + CACHE_TTL_MS,
  });

  return data;
}

const PENDING_REPORT_STATES = ["Pending", "Under Review"];

const CHECKED_REPORT_STATES = ["Approved", "Rejected"];

const ALERT_REPORT_STATES = [
  ...PENDING_REPORT_STATES,
  ...CHECKED_REPORT_STATES,
];

function getTodayRange() {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

  return {
    startOfToday,
    startOfTomorrow,
  };
}

function normalizeStateName(stateName: string) {
  return stateName.trim().toLowerCase();
}

function isPendingState(stateName: string) {
  return PENDING_REPORT_STATES.some(
    (state) => normalizeStateName(state) === normalizeStateName(stateName)
  );
}

function isCheckedState(stateName: string) {
  return CHECKED_REPORT_STATES.some(
    (state) => normalizeStateName(state) === normalizeStateName(stateName)
  );
}

/*
  Service: getDashboardSummary.
  Description: Returns the quick dashboard summary for the initial admin panel.
*/
export async function getDashboardSummary() {
  return getOrSetCache("dashboard-summary", async () => {
    const { startOfToday, startOfTomorrow } = getTodayRange();

    const [
      activeBoycotts,
      totalUsers,
      boycottReportsToday,
      commentReportsToday,
    ] = await prisma.$transaction([
      prisma.boycott.count({
        where: {
          DeletedByUser: false,
          DeletedAt: null,
        },
      }),

      prisma.appUser.count(),

      prisma.reportBoycott.count({
        where: {
          Report: {
            ReportedAt: {
              gte: startOfToday,
              lt: startOfTomorrow,
            },
          },
        },
      }),

      prisma.reportComment.count({
        where: {
          Report: {
            ReportedAt: {
              gte: startOfToday,
              lt: startOfTomorrow,
            },
          },
        },
      }),
    ]);

    const reportsToday = boycottReportsToday + commentReportsToday;

    return {
      activeBoycotts,
      totalUsers,
      reportsToday,
      boycottReportsToday,
      commentReportsToday,
    };
  });
}

/*
  Service: getImmediateActionAlerts.
  Description: Returns entities with the highest amount of boycott reports.
*/
export async function getImmediateActionAlerts() {
  return getOrSetCache("immediate-action-alerts", async () => {
    const entities = await prisma.entity.findMany({
      select: {
        EntityID: true,
        EntityName: true,
        Boycott: {
          where: {
            DeletedByUser: false,
            DeletedAt: null,
          },
          select: {
            BoycottID: true,
            Title: true,

            ReportBoycott: {
              select: {
                Report: {
                  select: {
                    ReportID: true,
                    ReportedAt: true,
                    ReportState: {
                      select: {
                        StateName: true,
                      },
                    },
                  },
                },
              },
            },

            CommentBoycott: {
              where: {
                DeletedByUser: false,
                DeletedAt: null,
              },
              select: {
                CommentBoycottID: true,
                ReportComment: {
                  select: {
                    Report: {
                      select: {
                        ReportID: true,
                        ReportedAt: true,
                        ReportState: {
                          select: {
                            StateName: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const alerts = entities
      .map((entity) => {
        let pendingReports = 0;
        let checkedReports = 0;
        let boycottReports = 0;
        let commentReports = 0;

        const boycotts = entity.Boycott.map((boycott) => {
          let boycottPendingReports = 0;
          let boycottCheckedReports = 0;
          let directBoycottReports = 0;
          let directCommentReports = 0;

          boycott.ReportBoycott.forEach((reportBoycott) => {
            const stateName = reportBoycott.Report.ReportState.StateName;

            directBoycottReports += 1;
            boycottReports += 1;

            if (isPendingState(stateName)) {
              pendingReports += 1;
              boycottPendingReports += 1;
            }

            if (isCheckedState(stateName)) {
              checkedReports += 1;
              boycottCheckedReports += 1;
            }
          });

          boycott.CommentBoycott.forEach((comment) => {
            comment.ReportComment.forEach((reportComment) => {
              const stateName = reportComment.Report.ReportState.StateName;

              directCommentReports += 1;
              commentReports += 1;

              if (isPendingState(stateName)) {
                pendingReports += 1;
                boycottPendingReports += 1;
              }

              if (isCheckedState(stateName)) {
                checkedReports += 1;
                boycottCheckedReports += 1;
              }
            });
          });

          return {
            boycottId: boycott.BoycottID,
            title: boycott.Title,
            pendingReports: boycottPendingReports,
            checkedReports: boycottCheckedReports,
            boycottReports: directBoycottReports,
            commentReports: directCommentReports,
            totalReports:
              boycottPendingReports + boycottCheckedReports,
          };
        }).filter((boycott) => boycott.totalReports > 0);

        return {
          entityId: entity.EntityID,
          entityName: entity.EntityName,
          totalReports: pendingReports + checkedReports,
          pendingReports,
          checkedReports,
          boycottReports,
          commentReports,
          boycotts,
        };
      })
      .filter((alert) => alert.totalReports > 0)
      .sort((a, b) => b.totalReports - a.totalReports)
      .slice(0, 10);

    return {
      alerts,
      totalAlerts: alerts.length,
      consideredStates: ALERT_REPORT_STATES,
    };
  });
}

/*
  Service: getPlatformKpis.
  Description: Returns global platform KPIs for the statistics dashboard.
*/
export async function getPlatformKpis() {
  return getOrSetCache("platform-kpis", async () => {
    const [
      totalUsers,
      historicalBoycotts,
      pendingBoycottReports,
      pendingCommentReports,
      totalFavorites,
    ] = await prisma.$transaction([
      prisma.appUser.count(),

      prisma.boycott.count(),

      prisma.reportBoycott.count({
        where: {
          Report: {
            ReportState: {
              StateName: {
                in: PENDING_REPORT_STATES,
              },
            },
          },
        },
      }),

      prisma.reportComment.count({
        where: {
          Report: {
            ReportState: {
              StateName: {
                in: PENDING_REPORT_STATES,
              },
            },
          },
        },
      }),

      prisma.userFavoriteBoycott.count(),
    ]);

    const globalPendingReports =
      pendingBoycottReports + pendingCommentReports;

    return {
      totalUsers,
      historicalBoycotts,
      globalPendingReports,
      pendingBoycottReports,
      pendingCommentReports,
      totalFavorites,
    };
  });
}
/*
  Service: getIndustriesWithMostBoycotts.
  Description: Returns the industries ranked by number of active boycotts.
*/
export async function getIndustriesWithMostBoycotts() {
  return getOrSetCache("industries-most-boycotts", async () => {
    const boycotts = await prisma.boycott.findMany({
      where: {
        DeletedByUser: false,
        DeletedAt: null,
      },
      select: {
        Entity: {
          select: {
            IndustryType: {
              select: { IndustryName: true },
            },
          },
        },
      },
    });

    const counts = new Map<string, number>();
    for (const boycott of boycotts) {
      const industryName = boycott.Entity?.IndustryType?.IndustryName ?? "Unknown";
      counts.set(industryName, (counts.get(industryName) ?? 0) + 1);
    }

    const industries = Array.from(counts.entries())
      .map(([industry, value]) => ({ industry, value }))
      .sort((a, b) => b.value - a.value);

    return { industries, total: boycotts.length };
  });
}

/*
  Service: getBoycottsByInjusticeCategory.
  Description: Returns the number and percentage of active boycotts per injustice category.
*/
export async function getBoycottsByInjusticeCategory() {
  return getOrSetCache("boycotts-by-injustice", async () => {
    const boycotts = await prisma.boycott.findMany({
      where: {
        DeletedByUser: false,
        DeletedAt: null,
      },
      select: {
        InjusticeType: {
          select: { InjusticeName: true },
        },
      },
    });

    const counts = new Map<string, number>();
    for (const boycott of boycotts) {
      const categoryName = boycott.InjusticeType?.InjusticeName ?? "Unknown";
      counts.set(categoryName, (counts.get(categoryName) ?? 0) + 1);
    }

    const total = boycotts.length;
    const categories = Array.from(counts.entries())
      .map(([category, value]) => ({
        category,
        value,
        percentage: total > 0 ? Math.round((value / total) * 1000) / 10 : 0,
      }))
      .sort((a, b) => b.value - a.value);

    return { categories, total };
  });
}

/* Diagnostics
export async function getDebugReportData() {
  const [
    reportStates,
    totalReports,
    totalReportBoycotts,
    totalEntities,
    totalBoycotts,
  ] = await prisma.$transaction([
    prisma.reportState.findMany({
      select: {
        ReportStateID: true,
        StateName: true,
      },
    }),

    prisma.report.count(),

    prisma.reportBoycott.count(),

    prisma.entity.count(),

    prisma.boycott.count(),
  ]);

  return {
    reportStates,
    totals: {
      totalReports,
      totalReportBoycotts,
      totalEntities,
      totalBoycotts,
    },
  };
}*/