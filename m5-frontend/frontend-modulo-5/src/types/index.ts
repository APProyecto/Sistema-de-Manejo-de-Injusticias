// Definir los roles posibles
export type UserRole = 'user' | 'admin' | 'master';

export interface User {
  id: number
  username: string
  name: string
  lastName: string
  email: string
  role: UserRole
  profilePicture?: string
  gender?: string
  region?: string
}

export interface PostCardData {
  id: number;
  username: string;
  user_picture: string;
  indicted: string;
  indicted_picture: string;
  case: string;
  case_picture: string;
  title: string;
  description: string;
  creation_date: string;
  is_favorite?: boolean;
  votes: string;
  voted_by_user?: boolean | null;
  coments: string;
  evidences: string;
  state: string;
}

export interface Comentario {
  id: number;
  boycott_id: number;
  usuario_id: number;
  contenido: string;
  fecha_creacion: string;
  votos: number;
  nombre_usuario?: string;
}

// src/types/index.ts
export interface Boycott {
  id: number;
  nombre_entidad: string;
  categoria: string;
  logo?: string;
  industria: string;
  pais: string;
  tipo_injusticia: string;
  descripcion: string;
  estado: 'activo' | 'eliminado' | 'en_revision' | 'editado';
  usuario_creador_id: number;
  fecha_creacion: string;
  fecha_actualizacion: string;
  votos_positivos?: number;
  votos_negativos?: number;
  es_favorito?: boolean;
  voto_usuario?: boolean | null;
}

export interface CreateBoycottData {
  nombre_entidad: string;
  categoria: string;
  logo?: string;
  industria: string;
  pais: string;
  tipo_injusticia: string;
  descripcion: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}