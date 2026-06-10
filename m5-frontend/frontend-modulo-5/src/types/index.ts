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

export interface SimpleUser {
  id: number,
  username: string,
  profilePicture?: string,
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
  caseNumber?: string;
}

export interface Indicted {
  id: number;
  name: string;
  picture: string;
  description: string;
  category: string;
  cases: string[]; //las injusticias en las que ha estado involucrado
}

export interface Evidence {
  id: number;
  name: string;
  type: 'pdf' | 'image' | 'video' | 'file'
  extension: string;
  weight: string;
}

export interface DetailedPostData {
  id: number;
  user: SimpleUser;
  indicted: Indicted;
  type: string;
  country: string;
  caseNumber?: string; // número de expediente en denuncia
  case: string;
  case_picture: string;
  title: string;
  description: string;
  creation_date: string;
  last_updated: string;
  is_favorite?: boolean;
  votes: string;
  voted_by_user?: boolean | null;
  comment_amount: string;
  comments: Comment[];
  state: string;
  evidences: Evidence[];
}

export interface Comment {
  id: number;
  user: SimpleUser;
  content: string;
  creation_date: string;
  votes: string;
  voted_by_user: boolean | null;
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