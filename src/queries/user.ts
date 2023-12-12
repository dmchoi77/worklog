import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  checkDuplicationEmail,
  checkDuplicationUsername,
  login,
  logout,
  refreshAccessToken,
  signIn,
} from '~/apis/user';
import { ILoginRequest, ILoginResponse, ISignInRequest } from '~/types/apis/user.types';
import { useEffect } from 'react';
import { removeCookie, setCookie } from '~/utils/cookie';
import { useRouter } from 'next/router';
import { ACCESS_TOKEN, ONE_HOUR, REFRESH_TOKEN, TEN_HOURS } from '~/constants/cookie';

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

      setCookie(ACCESS_TOKEN, accessToken, {
        secure: true,
        path: '/',
        maxAge: ONE_HOUR,
      });
      setCookie(REFRESH_TOKEN, refreshToken, {
        secure: true,
        path: '/',
        maxAge: TEN_HOURS,
      });
    },
  });
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: ({ username, email, password, passwordCheck }: ISignInRequest) =>
      signIn({ username, email, password, passwordCheck }),
  });
};

export const useCheckDuplicationEmail = (email: string) =>
  useQuery({
    queryKey: userQueryKeys.checkDuplicationEmail.queryKey,
    queryFn: () => checkDuplicationEmail({ email }),
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
    enabled: !!refreshToken,
  });

  useEffect(() => {
    if (!query.data) return;
    const { refreshToken, accessToken } = query.data;

    removeCookie(REFRESH_TOKEN);
    removeCookie(ACCESS_TOKEN);

    setCookie(REFRESH_TOKEN, refreshToken, {
      secure: true,
      path: '/',
      maxAge: TEN_HOURS,
    });
    setCookie(ACCESS_TOKEN, accessToken, {
      secure: true,
      path: '/',
      maxAge: ONE_HOUR,
    });
  }, [query]);

  return query;
};

export const useLogout = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      removeCookie(ACCESS_TOKEN);
      removeCookie(REFRESH_TOKEN);

      router.push('/login');
    },
  });
};
