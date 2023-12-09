import axios from 'axios';
import { baseURL } from '~/constants/url';
import { ICommonResponse } from '~/types/apis/common.types';
import { ILoginRequest, ILoginResponse, ISignInRequest } from '~/types/apis/user.types';
import { getCookie } from '~/utils/cookie';
import http from '~/utils/http';

export const login = async ({ username, password }: ILoginRequest) => {
  const response = await http.post<ICommonResponse<ILoginResponse>>(
    '/users/login',
    {
      username,
      password,
    },
    {
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    },
  );

  return response.data.data;
};

export const signIn = ({ username, email, password, passwordCheck }: ISignInRequest) => {
  return axios.post<ISignInRequest, ICommonResponse>(
    '/users/signIn',
    {
      username,
      email,
      password,
      passwordCheck,
    },
    {
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    },
  );
};

/**
 * 이메일 중복확인
 */
export const checkDuplicationEmail = ({ email }: { email: string }) => {
  return axios.get('/users/email/check', {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    params: {
      email,
    },
  });
};

/**
 * 아이디 중복확인
 */
export const checkDuplicationUsername = ({ username }: { username: string }) => {
  return axios.get('/users/username/check', {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    params: {
      username,
    },
  });
};

export const refreshAccessToken = async (refreshToken: string) => {
  const response = await axios.post<ICommonResponse<ILoginResponse>>(
    '/users/reissue',
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    },
  );

  return response.data.data;
};

export const logout = async () => {
  const response = await http.post<ICommonResponse>(
    '/users/logout',
    {},
    {
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    },
  );

  return response.data.data;
};
