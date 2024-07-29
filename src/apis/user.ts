import axios from 'axios';

import type { AxiosResponse } from 'axios';

import type {
  LoginPayload,
  LoginResponse,
  SignInPayload,
  CheckEmailPayload,
  CheckUsernamePayload,
  ICommonResponse,
} from '~/types';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const login = async ({ username, password }: LoginPayload) => {
  const { data } = await axios.post<ICommonResponse<LoginResponse>>('/api/login', {
    username,
    password,
  });
  return data;
};

export const reissue = async () => {
  const { data } = await axios.post<ICommonResponse<LoginResponse>>('/api/reissue');
  return data;
};

export const logout = async () => {
  await axios.post<ICommonResponse>('/api/logout');

  window.location.href = '/login';
};

export const signIn = ({ username, email, password, passwordCheck }: SignInPayload) => {
  return axios.post<SignInPayload, ICommonResponse>(
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

/**
 * 이메일 중복확인
 */
export const checkEmail = async ({ email }: CheckEmailPayload) => {
  const { data } = await axios.get<CheckEmailPayload, AxiosResponse<ICommonResponse>>('/users/email/check', {
    baseURL,
    params: { email },
  });

  return data;
};

/**
 * 아이디 중복확인
 */
export const checkUsername = async ({ username }: { username: string }) => {
  const { data } = await axios.get<CheckUsernamePayload, AxiosResponse<ICommonResponse>>('/users/username/check', {
    baseURL,
    params: {
      username,
    },
  });
  return data;
};
