// src/services/boycottService.ts
import type { ApiResponse, PostCardData, CreateBoycottData, DetailedPostData, FilterCategories } from '../types';
import { authApi, boycottApi } from './api';

type HttpMethod = 'get' | 'post' | 'delete';

type VoteResult = {
  votoActual: boolean | null;
  votesInFavor?: number;
  votesAgainst?: number;
};

const pendingVoteRequests = new Map<string, Promise<VoteResult>>();

const tryEndpoints = async <T>(
  endpoints: Array<{ method: HttpMethod; url: string; data?: unknown; params?: Record<string, unknown> }>
): Promise<T> => {
  let lastError: unknown;

  for (const endpoint of endpoints) {
    try {
      if (endpoint.method === 'get') {
        const response = await boycottApi.get<T>(endpoint.url, { params: endpoint.params });
        return response.data;
      }

      if (endpoint.method === 'delete') {
        const response = await boycottApi.delete<T>(endpoint.url, { params: endpoint.params });
        return response.data;
      }

      const response = await boycottApi.post<T>(endpoint.url, endpoint.data, { params: endpoint.params });
      return response.data;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
};

// Obtener todos los boycotts (con filtros)
export const getBoycotts = async (filters?: {
  industria?: string;
  pais?: string;
  tipo_injusticia?: string;
  orden?: string;
}, userId?: number): Promise<PostCardData[]> => {
  const response = await boycottApi.get<ApiResponse<PostCardData[]>>('/api/boycotts', {
    params: {
      ...filters,
      ...(userId === undefined ? {} : { userId }),
      page: 1,
      pageSize: 10,
      orderBy: 'votes',
    },
  });
  
  return response.data.data;
};

export const searchBoycotts = async (
  q: string,
  filters?: {
    industryTypeId?: number;
    countryId?: number;
    injusticeTypeId?: number;
    orderBy?: string;
  },
  userId?: number
): Promise<PostCardData[]> => {
  const response = await boycottApi.get<ApiResponse<PostCardData[]>>(`/api/boycotts/search`, {
    params: {
      q,
      ...filters,
      ...(userId === undefined ? {} : { userId }),
      page: 1,
      pageSize: 10,
    },
  });
  console.log(response);
  return response.data.data;
};

export const getFilterCategories = async (): Promise<FilterCategories> => {
  const response = await boycottApi.get(`/api/boycotts/filters`);
  const { paises, industrias, tiposInjusticia } = response.data.data;
  
  return {
    countries: paises.map((p: any) => ({ id: p.CountryID, name: p.CountryName })),
    industries: industrias.map((i: any) => ({ id: i.IndustryTypeID, name: i.IndustryName })),
    injustices: tiposInjusticia.map((t: any) => ({ id: t.InjusticeTypeID, name: t.InjusticeName })),
    orderOptions: [
      { id: 0, name: "Most Recent" },
      { id: 1, name: "Oldest" },
      { id: 2, name: "Most relevant" },
      { id: 3, name: "Less relevant" },
    ],
  };
};

// Obtener un boycott por ID
export const getBoycottById = async (id: number, userId?: number): Promise<DetailedPostData> => {
  const response = await boycottApi.get<ApiResponse<DetailedPostData>>(`/api/boycotts/${id}`, {
    params: userId === undefined ? undefined : { userId },
  });
  console.log(response.data);
  return response.data.data;
};

// Crear un nuevo boycott
export const createBoycott = async (data: CreateBoycottData): Promise<PostCardData> => {
  const response = await boycottApi.post<ApiResponse<PostCardData>>('/api/boycotts', data);
  return response.data.data;
};

// Actualizar un boycott
export const updateBoycott = async (id: number, data: Partial<CreateBoycottData>): Promise<PostCardData> => {
  const response = await boycottApi.put<ApiResponse<PostCardData>>(`/api/boycotts/${id}`, data);
  return response.data.data;
};

// Eliminar un boycott
export const deleteBoycott = async (id: number): Promise<void> => {
  await boycottApi.delete(`/api/boycotts/${id}`);
};

// Votar por un boycott
export const voteBoycott = async (
  id: number,
  voto: boolean,
  userId?: number,
): Promise<VoteResult> => {
  const requestKey = `${id}:${userId ?? 'anon'}:${voto}`;

  const inFlight = pendingVoteRequests.get(requestKey);
  if (inFlight) {
    return inFlight;
  }

  const requestPromise = (async (): Promise<VoteResult> => {
    const endpoints = [
      { url: `/api/boycotts/${id}/vote`, data: { isInFavor: voto, userId }, params: userId ? { userId } : undefined },
      { url: `/api/boycotts/${id}/voto`, data: { voto }, params: undefined },
      { url: `/api/boycotts/${id}/votes`, data: { inFavor: voto }, params: undefined },
    ];

    let lastError: unknown;

    for (const endpoint of endpoints) {
      try {
        const voteResponse = await boycottApi.post<VoteResult>(endpoint.url, endpoint.data, { params: endpoint.params });
        return voteResponse.data;
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError;
  })();

  pendingVoteRequests.set(requestKey, requestPromise);

  try {
    return await requestPromise;
  } finally {
    pendingVoteRequests.delete(requestKey);
  }
};

// Marcar/desmarcar favorito
export const setFavorite = async (id: number, isFavorite: boolean, userId?: number): Promise<void> => {
  if (isFavorite) {
    await tryEndpoints([
      { method: 'post', url: `/api/boycotts/${id}/favorite`, params: userId ? { userId } : undefined },
      { method: 'post', url: `/api/boycotts/${id}/favorito` },
      { method: 'post', url: `/api/admin/boycotts/${id}/favorites`, params: userId ? { userId } : undefined },
    ]);
    return;
  }

  await tryEndpoints([
    { method: 'delete', url: `/api/boycotts/${id}/favorite`, params: userId ? { userId } : undefined },
    { method: 'delete', url: `/api/boycotts/${id}/favorito` },
    { method: 'delete', url: `/api/admin/boycotts/${id}/favorites`, params: userId ? { userId } : undefined },
  ]);
};

// Obtener boycotts favoritos
export const getFavorites = async (userId?: number): Promise<PostCardData[]> => {
  const data = await tryEndpoints<ApiResponse<PostCardData[]> | { success: boolean; data: PostCardData[] }>([
    { method: 'get', url: '/api/boycotts/favorites', params: userId ? { userId } : undefined },
    { method: 'get', url: '/api/boycotts/favoritos' },
    { method: 'get', url: '/api/admin/boycotts/favorites', params: userId ? { userId } : undefined },
  ]);

  return (data as any).data ?? [];
};

// Reportar un boycott
export const reportBoycott = async (
  id: number,
  payload: { reason: string; description?: string },
  userId?: number
): Promise<void> => {
  await tryEndpoints([
    {
      method: 'post',
      url: `/api/boycotts/${id}/report`,
      data: { ...payload, userId },
    },
    {
      method: 'post',
      url: `/api/admin/boycotts/${id}/report`,
      data: payload,
      params: userId ? { userId } : undefined,
    },
  ]);
};

// Prueba temporal: obtener cantidad de usuarios desde M1
export const testGetUserCount = async (): Promise<{ totalUsers: number }> => {
  const response = await authApi.get<{ totalUsers: number }>('/api/users/count');

  return response.data;
};

// Prueba temporal: obtener lista de usuarios desde M1
export const testGetUsers = async (): Promise<any[]> => {
  const response = await authApi.get<any[]>('/api/users/listUsers');

  return response.data;
};
