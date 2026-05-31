import { authApi } from './api';

interface User {
  id: number
  nombreUsuario: string
  nombre: string
  apellido: string
  email: string
  rol: 'user' | 'admin' | 'master'
  fotoPerfil?: string
  genero?: string
  pais?: string
}

interface LoginResponse {
  success: boolean
  data: {
    token: string
    user: User
  }
}

interface ProfileResponse {
  success: boolean
  data: User
}

export const login = async (identifier: string, password: string): Promise<LoginResponse> => {
  const isEmail = identifier.includes('@');
  const response = await authApi.post<LoginResponse>('/api/login', { 
    ...(isEmail ? {email:identifier} : {nombreUsuario: identifier}), 
    password 
  });
  
  if (response.data.success) {
    // Guardar token y usuario
    localStorage.setItem('token', response.data.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.data.user));
  }
  
  return response.data;
};

export const logout = async (): Promise<void> => {
  await authApi.post('/api/logout')
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export const getUserProfile = async (id: number): Promise<ProfileResponse> => {
  const response = await authApi.get<ProfileResponse>(`/api/users/${id}`)
  return response.data
}