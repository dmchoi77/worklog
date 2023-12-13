import axios from 'axios';
import { ICommonResponse } from '~/types/apis/common.types';
import { ILoginRequest, ILoginResponse, ISignInRequest } from '~/types/apis/user.types';
import http from '~/utils/http';
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const login = async ({ username, password }: ILoginRequest) => {
  const response = await http.post<ICommonResponse<ILoginResponse>>(
    '/users/login',
    {
      username,
      password,
    },
    {
      baseURL,
    },
  );

  return response.data.data;
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
export const checkDuplicationEmail = async ({ email }: { email: string }) => {
  const response = await axios.get('/users/email/check', {
    baseURL,
    params: {
      email,
    },
  });

  return response.data.data;
};

/**
 * 아이디 중복확인
 */
export const checkDuplicationUsername = async ({ username }: { username: string }) => {
  const response = await axios.get('/users/username/check', {
    baseURL,
    params: {
      username,
    },
  });
  return response.data.data;
};

export const refreshAccessToken = async (refreshToken: string) => {
  const response = await axios.post<ICommonResponse<ILoginResponse>>(
    '/users/reissue',
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      baseURL,
    },
  );

  return response.data.data;
};

export const logout = async () => {
  const response = await http.post<ICommonResponse>(
    '/users/logout',
    {},
    {
      baseURL,
    },
  );

  return response.data.data;
};
