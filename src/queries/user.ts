import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { AxiosError } from 'axios';

import { checkEmail, checkUsername, login, logout, signIn } from '~/apis/user';
import { useUserInfoState } from '~/stores/useUserInfoStore';
import { httpWithAuth } from '~/utils/http';

import type { ICommonResponse, LoginPayload, SignInPayload } from '~/types';

const userQueryKeys = createQueryKeys('user', {
  refreshAccessToken: ['refreshAccessToken'],
  checkEmail: ['checkEmail'],
  checkUsername: ['checkUsername'],
});

export const useLogin = () =>
  useMutation({
    mutationFn: ({ username, password }: LoginPayload) => login({ username, password }),
  });

export const useSignIn = () =>
  useMutation({
    mutationFn: ({ username, email, password, passwordCheck }: SignInPayload) =>
      signIn({ username, email, password, passwordCheck }),
  });

export const useCheckEmail = (email: string) => {
  const queryClient = useQueryClient();
  const query = useQuery<ICommonResponse, AxiosError>({
    queryKey: userQueryKeys.checkEmail.queryKey,
    queryFn: () => checkEmail({ email }),
    enabled: false,
  });

  useEffect(() => {
    if (query.error) {
      queryClient.setQueryData(userQueryKeys.checkEmail.queryKey, query.error?.response?.data);
    }
  }, [query.error]);

  return query;
};

export const useCheckUsername = (username: string) => {
  const queryClient = useQueryClient();
  const query = useQuery<ICommonResponse, AxiosError>({
    queryKey: userQueryKeys.checkUsername.queryKey,
    queryFn: () => checkUsername({ username }),
    enabled: false,
  });
  useEffect(() => {
    if (query.error) {
      queryClient.setQueryData(userQueryKeys.checkUsername.queryKey, query.error?.response?.data);
    }
  }, [query.error]);

  return query;
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const resetUserInfo = useUserInfoState((state) => state.reset);

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      httpWithAuth.defaults.headers.Authorization = null;
      resetUserInfo();
      queryClient.removeQueries();
      router.push('/login');
    },
  });
};
