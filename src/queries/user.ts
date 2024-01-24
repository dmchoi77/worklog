import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';

import { createQueryKeys } from '@lukemorales/query-key-factory';

import {
  checkDuplicationEmail,
  checkDuplicationUsername,
  login,
  logout,
  refreshAccessToken,
  signIn,
} from '~/apis/user';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/constants/cookie';
import { useUserInfoState } from '~/stores/useUserInfoStore';
import { ILoginRequest, ILoginResponse, ISignInRequest } from '~/types/apis/user.types';
import { removeCookie, setCookie } from '~/utils/cookie';
import { getRemainExp } from '~/utils/decodeJWT';
import http from '~/utils/http';

const userQueryKeys = createQueryKeys('user', {
  refreshAccessToken: ['refreshAccessToken'],
  checkDuplicationEmail: ['checkDuplicationEmail'],
  checkDuplicationUsername: ['checkDuplicationUsername'],
});

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ username, password }: ILoginRequest) => login({ username, password }),
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data as ILoginResponse;

      // setCookie(ACCESS_TOKEN, accessToken);
      // setCookie(REFRESH_TOKEN, refreshToken, {
      // maxAge: getRemainExp(refreshToken),
      // });
    },
  });
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: ({ username, email, password, passwordCheck }: ISignInRequest) =>
      signIn({ username, email, password, passwordCheck }),
  });
};

export const useCheckDuplicationEmail = () =>
  useMutation({
    mutationFn: (email: string) => checkDuplicationEmail({ email }),
  });

export const useCheckDuplicationUsername = (username: string) =>
  useQuery({
    queryKey: userQueryKeys.checkDuplicationUsername.queryKey,
    queryFn: () => checkDuplicationUsername({ username }),
  });

export const useRefreshAccessToken = (refreshToken: string) => {
  const query = useQuery({
    queryKey: userQueryKeys.refreshAccessToken.queryKey,
    queryFn: () => refreshAccessToken(refreshToken),
  });

  useEffect(() => {
    if (!query.data) {
      // removeCookie(ACCESS_TOKEN, { path: '/' });
      // removeCookie(REFRESH_TOKEN, { path: '/' });
      // http.defaults.headers.Authorization = null;
      return;
    }
    if (query.isSuccess) {
      const { refreshToken, accessToken } = query.data;

      setCookie(REFRESH_TOKEN, refreshToken, {
        maxAge: getRemainExp(refreshToken),
      });
      setCookie(ACCESS_TOKEN, accessToken);
      http.defaults.headers.Authorization = `Bearer ${accessToken}`;
    }
  }, [query.data]);

  return query;
};

export const useLogout = () => {
  const router = useRouter();
  const resetUserInfo = useUserInfoState((state) => state.reset);

  return useMutation({
    mutationFn: () => logout(),
    onSettled: () => {
      removeCookie(ACCESS_TOKEN, { path: '/' });
      removeCookie(REFRESH_TOKEN, { path: '/' });
      http.defaults.headers.Authorization = null;
      resetUserInfo();
      router.push('/login');
    },
  });
};
