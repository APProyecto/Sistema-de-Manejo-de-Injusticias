import { authApi } from './api';

export const syncUser = async (
  token: string,
  email: string,
  name: string,
) => {

  const response = await authApi.get('/api/me', {
    headers: {

      Authorization: `Bearer ${token}`,

      "x-user-email": email,

      "x-user-name": name,
    },
  });

  return response.data;
};