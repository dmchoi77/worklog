import axios from 'axios';
import type { LoginPayload, LoginResponse } from './types';

export const login = async ({ username, password }: LoginPayload): Promise<LoginResponse> => {
  const { data } = await axios.post('/api/login', {
    username,
    password,
  });

  return data;
};
