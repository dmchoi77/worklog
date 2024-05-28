import axios, { AxiosResponse } from 'axios';

import { ICommonResponse } from '~/types/apis/common.types';
import {
  ILoginRequest,
  ILoginResponse,
  ISignInRequest,
  ICheckEmailRequest,
  ICheckUsernameRequest,
} from '~/types/apis/user.types';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const login = async ({ username, password }: ILoginRequest) => {
  try {
    const response = await axios.post<ICommonResponse<ILoginResponse>>('/api/login', {
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
    const response = await axios.post<ICommonResponse<ILoginResponse>>('/api/reissue');
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const logout = async () => {
  await axios.post<ICommonResponse>('/api/logout');

  window.location.href = '/login';
};

export const signIn = ({ username, email, password, passwordCheck }: ISignInRequest) => {
  return axios.post<ISignInRequest, ICommonResponse>(
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
export const checkEmail = async ({ email }: ICheckEmailRequest) => {
  const response = await axios.get<ICheckEmailRequest, AxiosResponse<ICommonResponse>>('/users/email/check', {
    baseURL,
    params: { email },
  });

  return response.data;
};

/**
 * 아이디 중복확인
 */
export const checkUsername = async ({ username }: { username: string }) => {
  const response = await axios.get<ICheckUsernameRequest, AxiosResponse<ICommonResponse>>('/users/username/check', {
    baseURL,
    params: {
      username,
    },
  });
  return response.data;
};
