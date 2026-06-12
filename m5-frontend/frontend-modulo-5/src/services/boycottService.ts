// src/services/boycottService.ts
import type { ApiResponse, PostCardData, DetailedPostData, FilterCategories, simpleEntity, CreateBoycottData } from '../types';
import { authApi, boycottApi } from './api';


type HttpMethod = 'get' | 'post' | 'delete';

type VoteResult = {
  votoActual: boolean | null;
  votesInFavor?: number;
  votesAgainst?: number;
};

interface RawMyBoycott {
  BoycottID: number;
  Title: string;
  Description?: string;
  CaseNumber: string | null;
  PublicationDate: string;
  LastUpdateDate: string | null;
  VotesInFavor: number;
  VotesAgainst: number;
  NumberComments: number;
  NumberFavorites: number;
  MongoDocumentId: string | null;
  DeletedByUser: boolean;
  CreatorID: number;

  Entity: {
    EntityID: number;
    EntityName: string;
    Description: string | null;
    MongoDocumentID: string | null;
    CategoryEntity?: {
      CategoryEntityID: number;
      CategoryName: string;
    };
    IndustryType?: {
      IndustryName: string;
    };
    Sector?: {
      SectorName: string;
    };
  };

  InjusticeType: {
    InjusticeTypeID: number;
    InjusticeName: string;
  };

  Country: {
    CountryID: number;
    CountryName: string;
    Continent?: {
      ContinentName: string;
    };
  };

  BoycottState: {
    BoycottStateID: number;
    StateName: string;
  };
}

interface MyBoycottsResponse {
  ok: boolean;
  total: number;
  data: RawMyBoycott[];
}

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
      orderBy: 'votes'
    },
  });
  
  return response.data.data;
};

export const getMyBoycotts = async (
  creatorId: number
): Promise<PostCardData[]> => {
  const response = await boycottApi.get<MyBoycottsResponse>(
    "/api/boycotts/mine",
    {
      params: {
        creatorId,
      },
    }
  );

  const getEntityBoycottPictureUrl = (
  entityId?: number | string | null
): string => {
  if (!entityId) return "";

  return `${import.meta.env.VITE_API_MODULE1}/api/files/entityBoycott/${entityId}/picture`;
};

  return response.data.data.map((item): PostCardData => ({
    id: item.BoycottID,

    username: "You",
    user_picture: "",

    indicted: item.Entity.EntityName,
    indicted_picture: getEntityBoycottPictureUrl(item.Entity.EntityID),

    case: item.InjusticeType.InjusticeName,
    case_picture: "",

    title: item.Title,

    description: item.Description ?? "",

    creation_date: item.PublicationDate,

    is_favorite: false,
    votes: String(item.VotesInFavor - item.VotesAgainst),
    voted_by_user: null,

    coments: String(item.NumberComments),
    evidences: "0",

    state: item.BoycottState.StateName,
    caseNumber: item.CaseNumber ?? undefined,
  }));
};

export const searchBoycotts = async (
  q: string,
  filters?: {
    industryTypeId?: number;
    countryId?: number;
    injusticeTypeId?: number;
    orderBy?: number; // 1: Most Recent, 2: Oldest, 3: Most relevant, 4: Less relevant
  },
  userId?: number
): Promise<PostCardData[]> => {
  // Mapear el orderBy ID a los parámetros que espera el backend
  let orderByParam: 'createdAt' | 'votes' | 'relevance' | undefined;
  let orderDirectionParam: 'asc' | 'desc' = 'desc';
  
  switch (filters?.orderBy) {
    case 1: // Most Recent
      orderByParam = 'createdAt';
      orderDirectionParam = 'desc';
      break;
    case 2: // Oldest
      orderByParam = 'createdAt';
      orderDirectionParam = 'asc';
      break;
    case 3: // Most relevant
      orderByParam = 'relevance';
      orderDirectionParam = 'desc';
      break;
    case 4: // Less relevant
      orderByParam = 'relevance';
      orderDirectionParam = 'asc';
      break;
    default:
      // Por defecto: Most Recent
      orderByParam = 'createdAt';
      orderDirectionParam = 'desc';
      break;
  }
  
  const response = await boycottApi.get<ApiResponse<PostCardData[]>>(`/api/boycotts/search`, {
    params: {
      q,
      ...(filters?.industryTypeId && { industryTypeId: filters.industryTypeId }),
      ...(filters?.countryId && { countryId: filters.countryId }),
      ...(filters?.injusticeTypeId && { injusticeTypeId: filters.injusticeTypeId }),
      orderBy: orderByParam,
      orderDirection: orderDirectionParam,
      ...(userId === undefined ? {} : { userId }),
      page: 1,
      pageSize: 10,
    },
  });
  
  console.log(response);
  return response.data.data;
};

const getEntityPicture = async (id: number): Promise<string | null> => {
  try {
    const response = await authApi.get(`/api/files/entities/${id}/picture`, {
      responseType: 'blob',
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error(`Error loading entity picture ${id}:`, error);
    console.log(`No picture found for entity ${id}`);
    return null;
  }
}

export const searchEntities = async (
  inputValue: string,
  categoryId: number,
): Promise<simpleEntity[]> => {
  const response = await boycottApi.get<ApiResponse<simpleEntity[]>>(`/api/entities`, {
    params: {
      q: inputValue,
      categoryEntityId: categoryId
    },
  });

  const entitiesWithPictures = await Promise.all(
    response.data.data.map(async (entity) => ({
      id: entity.id,
      categoryId: entity.categoryId,
      name: entity.name,
      picture: await getEntityPicture(entity.id), 
    }))
  );

  return entitiesWithPictures;
};

export const getFilterCategories = async (): Promise<FilterCategories> => {
  const response = await boycottApi.get(`/api/boycotts/filters`);
  const { paises, industrias, tiposInjusticia } = response.data.data;
  
  return {
    countries: paises.map((p: any) => ({ id: p.CountryID, name: p.CountryName })),
    industries: industrias.map((i: any) => ({ id: i.IndustryTypeID, name: i.IndustryName })),
    injustices: tiposInjusticia.map((t: any) => ({ id: t.InjusticeTypeID, name: t.InjusticeName })),
    orderOptions: [
      { id: 1, name: "Most Recent" },
      { id: 2, name: "Oldest" },
      { id: 3, name: "Most relevant" },
      { id: 4, name: "Less relevant" },
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

/**
 * Función: createBoycott
 * Descripción: Crea un nuevo boycott sin evidencias
 * Inputs: Datos del boycott del formulario
 * Outputs: Boycott creado
 */
// src/services/boycottService.ts

export const createBoycott = async (data: {
  title: string;
  description: string;
  creatorId: number; // ← Cambiar de createdBy a creatorId
  entityId: number;
  countryId: number;
  injusticeTypeId: number;
  boycottStateId?: number;
  creatorUsername?: string;
  caseNumber?: number;
}): Promise<PostCardData> => {
  const payload = {
    ...data,
    boycottStateId: data.boycottStateId || 1, // Valor por defecto
  };

  const response = await boycottApi.post<ApiResponse<PostCardData>>(
    '/api/boycotts',
    payload
  );
  
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

export const getMyBoycotts = async (creatorId: number): Promise<PostCardData[]> => {
  const response = await boycottApi.get<{ ok: boolean; total: number; data: any[] }>(
    '/api/boycotts/mine',
    {
      params: { creatorId },
    }
  );

  const rows = response.data.data ?? [];

  return rows.map((item: any) => ({
    id: Number(item.BoycottID),
    username: 'You',
    user_picture: '',
    indicted: item.Entity?.EntityName ?? 'Unknown',
    indicted_picture: '',
    case: item.InjusticeType?.InjusticeName ?? 'Unknown',
    case_picture: '',
    title: item.Title ?? '',
    description: '',
    creation_date: item.PublicationDate ?? new Date().toISOString(),
    is_favorite: false,
    votes: String((item.VotesInFavor ?? 0) - (item.VotesAgainst ?? 0)),
    voted_by_user: null,
    coments: String(item.NumberComments ?? 0),
    evidences: '0',
    state: item.BoycottState?.StateName ?? 'Active',
    caseNumber: item.CaseNumber ? String(item.CaseNumber) : undefined,
  }));
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

type BoycottEvidenceMetadata = {
  fileName: string;
  fileSize: number;
  contentType: string;
  mongoFileId: string;
  gridFsId: string;
};

export const uploadEvidenceFiles = async (files: File[]): Promise<BoycottEvidenceMetadata[]> => {
  if (!files.length) {
    return [];
  }

  const uploaded = await Promise.all(files.map((file) => uploadImage(file)));

  return uploaded.map(({ metadata }) => {
    const fileName = String(metadata.fileName ?? metadata.filename ?? 'archivo');
    const fileSize = Number(metadata.fileSize ?? metadata.size ?? 0);
    const contentType = String(metadata.contentType ?? 'application/octet-stream');
    const mongoFileId = String(metadata.mongoFileId ?? metadata.gridFsId ?? '');
    const gridFsId = String(metadata.gridFsId ?? metadata.mongoFileId ?? '');

    return {
      fileName,
      fileSize,
      contentType,
      mongoFileId,
      gridFsId,
    };
  }).filter((item) => Boolean(item.mongoFileId));
};

export const attachEvidenceToBoycott = async (
  boycottId: number,
  evidence: BoycottEvidenceMetadata[]
): Promise<void> => {
  if (!evidence.length) {
    return;
  }

  await boycottApi.post(`/api/boycotts/${boycottId}/attachments`, {
    evidence,
  });
};

export const downloadEvidenceFile = async (fileId: string): Promise<Blob> => {
  console.log('📥 [downloadEvidenceFile] Iniciando descarga con fileId:', fileId);
  const url = `/api/upload/${encodeURIComponent(fileId)}`;
  console.log('📥 [downloadEvidenceFile] URL completa:', url);
  
  try {
    const response = await boycottApi.get(url, {
      responseType: 'blob',
    });
    console.log('✅ [downloadEvidenceFile] Descarga exitosa, blob size:', response.data.size);
    return response.data;
  } catch (error: any) {
    console.error('❌ [downloadEvidenceFile] Error:', error.message, error.response?.status, error.response?.data);
    throw error;
  }
};

export type BoycottAttachment = {
  id: string;
  nombre: string;
  tipo?: string | null;
  tamano?: number | null;
};

export const getBoycottAttachments = async (boycottId: number): Promise<BoycottAttachment[]> => {
  const response = await boycottApi.get<{ ok: boolean; data: BoycottAttachment[] }>(
    `/api/boycotts/${boycottId}/attachments`
  );

  return response.data.data ?? [];
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