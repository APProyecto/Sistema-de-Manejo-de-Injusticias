// src/services/boycottService.ts
import type { ApiResponse, PostCardData, CreateBoycottData, DetailedPostData, FilterCategories } from '../types';
import { authApi, boycottApi } from './api';

// Obtener todos los boycotts (con filtros)
export const getBoycotts = async (filters?: {
  industria?: string;
  pais?: string;
  tipo_injusticia?: string;
  orden?: string;
}): Promise<PostCardData[]> => {
  const response = await boycottApi.get<ApiResponse<PostCardData[]>>('/api/boycotts', {
    params: {
      ...filters,
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
  }
): Promise<PostCardData[]> => {
  const response = await boycottApi.get<ApiResponse<PostCardData[]>>(`/api/boycotts/search`, {
    params: {
      q,
      ...filters,
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
    params: userId !== undefined ? { userId } : undefined,
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
export const voteBoycott = async (id: number, voto: boolean): Promise<void> => {
  await boycottApi.post(`/api/boycotts/${id}/voto`, { voto });
};

// Marcar/desmarcar favorito
export const toggleFavorite = async (id: number): Promise<void> => {
  await boycottApi.post(`/api/boycotts/${id}/favorito`);
};

// Obtener boycotts favoritos
export const getFavorites = async (): Promise<PostCardData[]> => {
  const response = await boycottApi.get<ApiResponse<PostCardData[]>>('/api/boycotts/favoritos');
  return response.data.data;
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