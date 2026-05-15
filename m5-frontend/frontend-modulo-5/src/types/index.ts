export interface User {
  id: number;
  nombreUsuario: string;
  email: string;
  pais: string;
  fotoPerfil?: string;
  rol: 'sin_cuenta' | 'registrado' | 'administrador';
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