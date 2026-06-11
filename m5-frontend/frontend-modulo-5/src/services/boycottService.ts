// src/services/boycottService.ts
import { mockEntities } from '../data/mockEntities';
import type { ApiResponse, PostCardData, CreateBoycottData, DetailedPostData, FilterCategories, simpleEntity } from '../types';
import { authApi, boycottApi } from './api';

type HttpMethod = 'get' | 'post' | 'delete';

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

export const searchEntities = async (
  inputValue: string,
  categoryId: number,
): Promise<simpleEntity[]> => {

  const response = await boycottApi.get<ApiResponse<simpleEntity[]>>(`/api/entities?`, {
    params: {
      q: inputValue,
      categoryEntityId: categoryId
    },
  });
  return response.data.data;

  return mockEntities.filter(
    (e) =>
      e.categoryId === categoryId &&
      e.name.toLowerCase().includes(inputValue.toLowerCase())
  );
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
export const voteBoycott = async (id: number, voto: boolean, userId?: number): Promise<void> => {
  await tryEndpoints([
    { method: 'post', url: `/api/boycotts/${id}/vote`, data: { isInFavor: voto, userId }, params: userId ? { userId } : undefined },
    { method: 'post', url: `/api/boycotts/${id}/voto`, data: { voto } },
    { method: 'post', url: `/api/boycotts/${id}/votes`, data: { inFavor: voto } },
  ]);
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


// Subir una imagen al servidor
export const uploadImage = async (file: File): Promise<{ fileId: string; metadata: any }> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await boycottApi.post<ApiResponse<{ mongoFileId: string; gridFsId: string; filename: string; contentType: string; size: number }>>(
    '/api/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return {
    fileId: response.data.data.mongoFileId || response.data.data.gridFsId,
    metadata: response.data.data,
  };
};

// Crear una entidad con imagen
export const createEntityWithImage = async (
  entityData: {
    entityName: string;
    description?: string;
    categoryEntityId: number;
    industryTypeId?: number;
    sectorId?: number;
    userId: number;
  },
  imageFile?: File
): Promise<{ entityId: number; entityName: string }> => {
  
  let pictureMetadata = null;

  // Si hay imagen, subirla primero
  if (imageFile) {
    try {
      const uploadResult = await uploadImage(imageFile);
      
      // Crear el metadata de la imagen en el formato que espera el backend
      pictureMetadata = {
        mongoFileId: uploadResult.metadata.mongoFileId,
        gridFsId: uploadResult.metadata.gridFsId,
        filename: uploadResult.metadata.filename,
        contentType: uploadResult.metadata.contentType,
        size: uploadResult.metadata.size,
        uploadDate: new Date(),
      };
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      throw new Error('No se pudo subir la imagen. Por favor, intenta de nuevo.');
    }
  }

  // Crear la entidad con la metadata de la imagen
  const response = await boycottApi.post<ApiResponse<{ entityId: number }>>('/api/entities', {
    ...entityData,
    picture: pictureMetadata, // Si no hay imagen, esto será null
  });

  return {
    entityId: response.data.data.entityId,
    entityName: entityData.entityName,
  };
};

// Función para actualizar solo la imagen de una entidad existente
export const updateEntityImage = async (
  entityId: number,
  entityName: string,
  imageFile: File
): Promise<void> => {
  // Subir la nueva imagen
  const uploadResult = await uploadImage(imageFile);
  
  const pictureMetadata = {
    mongoFileId: uploadResult.metadata.mongoFileId,
    gridFsId: uploadResult.metadata.gridFsId,
    filename: uploadResult.metadata.filename,
    contentType: uploadResult.metadata.contentType,
    size: uploadResult.metadata.size,
    uploadDate: new Date(),
  };

  // Actualizar la imagen de la entidad
  await boycottApi.post(`/api/entities/${entityId}/picture`, {
    picture: pictureMetadata,
    entityName, // El backend necesita el entityName para el upsert
  });
};

// Función para eliminar la imagen de una entidad
export const deleteEntityImage = async (entityId: number): Promise<void> => {
  await boycottApi.delete(`/api/entities/${entityId}/picture`);
};