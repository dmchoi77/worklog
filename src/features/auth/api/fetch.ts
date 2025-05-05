import axios from 'axios';
import type { LoginPayload, LoginResponse, SignInPayload } from './types';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const login = async ({ username, password }: LoginPayload): Promise<LoginResponse> => {
  const { data } = await axios.post('/api/login', {
    username,
    password,
  });

  return data;
};

export const signIn = ({ username, email, password, passwordCheck }: SignInPayload) => {
  return axios.post(
    '/users',
    {
      username,
      email,
      password,
      passwordCheck,
    },
    {
      baseURL,
    },
  );
};
