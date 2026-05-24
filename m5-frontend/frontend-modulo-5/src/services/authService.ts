// src/services/authService.ts

import { authApi } from './api';

// Sincronizar usuario Auth0 con MySQL
export const syncUser = async (token: string) => {

  const response = await authApi.get('/api/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};