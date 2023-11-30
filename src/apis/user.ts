import axios from 'axios';
import { baseURL } from '~/constants/url';
import { ICommonResponse } from '~/types/apis/common.types';
import { ILoginRequest, ISignInRequest } from '~/types/apis/user.types';

export const login = ({ username, password }: ILoginRequest) => {
  return axios.post<ICommonResponse<{ token: string }>>(
    '/users/login',
    {
      username,
      password,
    },
    {
      baseURL,
    },
  );
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
      baseURL,
    },
  );
};

/**
 * 이메일 중복확인
 */
export const checkDuplicationEmail = ({ email }: { email: string }) => {
  return axios.get('/users/email/check', {
    baseURL: baseURL,
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
    baseURL: baseURL,
    params: {
      username,
    },
  });
};
