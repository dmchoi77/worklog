import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  checkDuplicationEmail,
  checkDuplicationUsername,
  login,
  refreshAccessToken,
  signIn,
} from '~/apis/user';
import { ILoginRequest, ILoginResponse, ISignInRequest } from '~/types/apis/user.types';
import { authToken } from '~/utils/authToken';
import cookie from 'react-cookies';
import { useEffect } from 'react';

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
      authToken.setToken(accessToken);
      cookie.save('refreshToken', refreshToken, {});
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
    queryFn: () => refreshAccessToken(),
    enabled: !!refreshToken,
  });

  useEffect(() => {
    const { refreshToken, accessToken } = query.data as ILoginResponse;

    cookie.remove('refreshToken');
    cookie.save('refreshToken', refreshToken, {});
    authToken.setToken(accessToken);
  }, [query]);

  return query;
};
