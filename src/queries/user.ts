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

      setCookie('accessToken', accessToken);
      setCookie('refreshToken', refreshToken, { path: '/', maxAge: 1000, secure: true });
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

    removeCookie('refreshToken');
    removeCookie('accessToken');
    setCookie('refreshToken', refreshToken);
    setCookie('accessToken', accessToken);
  }, [query]);

  return query;
};

export const useLogout = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      removeCookie('accessToken');
      removeCookie('refreshToken');

      router.push('/login');
    },
  });
};
