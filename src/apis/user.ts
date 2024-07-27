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
  try {
    const response = await axios.post<ICommonResponse<LoginResponse>>('/api/login', {
      username,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const reissue = async () => {
  try {
    const response = await axios.post<ICommonResponse<LoginResponse>>('/api/reissue');
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
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
  const response = await axios.get<CheckEmailPayload, AxiosResponse<ICommonResponse>>('/users/email/check', {
    baseURL,
    params: { email },
  });

  return response.data;
};

/**
 * 아이디 중복확인
 */
export const checkUsername = async ({ username }: { username: string }) => {
  const response = await axios.get<CheckUsernamePayload, AxiosResponse<ICommonResponse>>('/users/username/check', {
    baseURL,
    params: {
      username,
    },
  });
  return response.data;
};
