// src/services/boycottService.ts
import type { ApiResponse, Boycott, CreateBoycottData } from '../types';
import { boycottApi } from './api';

// Obtener todos los boycotts (con filtros)
export const getBoycotts = async (filters?: {
  industria?: string;
  pais?: string;
  tipo_injusticia?: string;
  orden?: string;
}): Promise<Boycott[]> => {
  const response = await boycottApi.get<ApiResponse<Boycott[]>>('/api/boycotts', {
    params: filters,
  });
  return response.data.data;
};

// Obtener un boycott por ID
export const getBoycottById = async (id: number): Promise<Boycott> => {
  const response = await boycottApi.get<ApiResponse<Boycott>>(`/api/boycotts/${id}`);
  return response.data.data;
};

// Crear un nuevo boycott
export const createBoycott = async (data: CreateBoycottData): Promise<Boycott> => {
  const response = await boycottApi.post<ApiResponse<Boycott>>('/api/boycotts', data);
  return response.data.data;
};

// Actualizar un boycott
export const updateBoycott = async (id: number, data: Partial<CreateBoycottData>): Promise<Boycott> => {
  const response = await boycottApi.put<ApiResponse<Boycott>>(`/api/boycotts/${id}`, data);
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
export const getFavorites = async (): Promise<Boycott[]> => {
  const response = await boycottApi.get<ApiResponse<Boycott[]>>('/api/boycotts/favoritos');
  return response.data.data;
};