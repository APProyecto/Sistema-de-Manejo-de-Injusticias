export interface User {
  id: number;
  nombreUsuario: string;
  email: string;
  pais: string;
  fotoPerfil?: string;
  rol: 'sin_cuenta' | 'registrado' | 'administrador';
}

export interface Boycott {
  id: number;
  nombre_entidad: string;
  categoria: string;
  industria: string;
  pais: string;
  tipo_injusticia: string;
  descripcion: string;
  estado: string;
  usuario_creador_id: number;
  fecha_creacion: string;
  votos_positivos: number;
  votos_negativos: number;
  es_favorito?: boolean;
  voto_usuario?: boolean | null;
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