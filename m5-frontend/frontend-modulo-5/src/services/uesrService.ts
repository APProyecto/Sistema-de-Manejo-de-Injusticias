import { authApi } from './api';

interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    user: {
      id: number;
      nombreUsuario: string;
      email: string;
      rol: 'user' | 'admin' | 'master';
      fotoPerfil?: string;
    };
  };
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