import { statsApi } from './api';

// Tipos de respuesta de m4-estadisticas

export interface DashboardSummary {
  activeBoycotts: number;
  totalUsers: number;
  reportsToday: number;
  boycottReportsToday: number;
  commentReportsToday: number;
}

export interface PlatformKpis {
  totalUsers: number;
  historicalBoycotts: number;
  globalPendingReports: number;
  pendingBoycottReports: number;
  pendingCommentReports: number;
  totalFavorites: number;
}

export interface ActionAlert {
  entityId: number;
  entityName: string;
  totalReports: number;
  pendingReports: number;
  checkedReports: number;
  boycottReports: number;
  commentReports: number;
}

export interface ImmediateActionAlerts {
  alerts: ActionAlert[];
  totalAlerts: number;
}

export interface IndustryBoycotts {
  industries: { industry: string; value: number }[];
  total: number;
}

export interface BoycottsByInjustice {
  categories: { category: string; value: number; percentage: number }[];
  total: number;
}

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const response = await statsApi.get<{ ok: boolean; data: DashboardSummary }>(
    '/api/metrics/dashboard-summary',
  );
  return response.data.data;
};

export const getPlatformKpis = async (): Promise<PlatformKpis> => {
  const response = await statsApi.get<{ ok: boolean; data: PlatformKpis }>(
    '/api/metrics/platform-kpis',
  );
  return response.data.data;
};

export const getImmediateActionAlerts = async (): Promise<ImmediateActionAlerts> => {
  const response = await statsApi.get<{ ok: boolean; data: ImmediateActionAlerts }>(
    '/api/metrics/immediate-action-alerts',
  );
  return response.data.data;
};

export const getIndustriesMostBoycotts = async (): Promise<IndustryBoycotts> => {
  const response = await statsApi.get<{ ok: boolean; data: IndustryBoycotts }>(
    '/api/metrics/industries-most-boycotts',
  );
  return response.data.data;
};

export const getBoycottsByInjustice = async (): Promise<BoycottsByInjustice> => {
  const response = await statsApi.get<{ ok: boolean; data: BoycottsByInjustice }>(
    '/api/metrics/boycotts-by-injustice',
  );
  return response.data.data;
};
