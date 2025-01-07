'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import type { AxiosError } from 'axios';
import { checkEmail, checkUsername, login, logout, signIn } from '~/apis/auth';
import { useDialogStore } from '~/stores/useDialogStore';
import { useUserInfoState } from '~/stores/useUserInfoStore';
import { commonResponseErrorHandler, httpWithAuth } from '~/utils/http';
import { getQueryClient } from '~/app/getQueryClient';
import type { ICommonResponse } from '~/types';

const userQueryKeys = createQueryKeys('user', {
  refreshAccessToken: ['refreshAccessToken'],
  checkEmail: ['checkEmail'],
  checkUsername: ['checkUsername'],
});

export const useLogin = () => {
  const router = useRouter();

  const updateUserInfoState = useUserInfoState((state) => state.updateUserInfoState);
  const updateDialogState = useDialogStore((state) => state.updateDialogState);

  return useMutation({
    mutationFn: login,
    onSuccess: (_, variable) => {
      updateUserInfoState(variable.username);
      router.push('/today');
    },
    onError: (error: any) => {
      const errorResponse = commonResponseErrorHandler(error);
      updateDialogState({
        open: true,
        mainText: errorResponse?.message || '서버 점검 중입니다.',
        cancelText: '',
      });
    },
  });
};

export const useSignIn = () => {
  const router = useRouter();

  const updateDialogState = useDialogStore((state) => state.updateDialogState);

  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      updateDialogState({
        open: true,
        mainText: '회원가입에 성공하였습니다.',
        cancelText: '',
        handleConfirm: () => {
          router.push('/login');
        },
      });
    },
    onError: (error: any) => {
      updateDialogState({
        open: true,
        mainText: error?.response?.data?.message || '서버 점검 중입니다.',
        cancelText: '',
      });
    },
  });
};

export const useCheckEmail = (email: string) => {
  const query = useQuery<ICommonResponse, AxiosError>({
    queryKey: userQueryKeys.checkEmail.queryKey,
    queryFn: () => checkEmail({ email }),
    enabled: false,
  });

  useEffect(() => {
    if (query.error) {
      getQueryClient().setQueryData(userQueryKeys.checkEmail.queryKey, query.error?.response?.data);
    }
  }, [query.error]);

  return query;
};

export const useCheckUsername = (username: string) => {
  const query = useQuery<ICommonResponse, AxiosError>({
    queryKey: userQueryKeys.checkUsername.queryKey,
    queryFn: () => checkUsername({ username }),
    enabled: false,
  });
  useEffect(() => {
    if (query.error) {
      getQueryClient().setQueryData(userQueryKeys.checkUsername.queryKey, query.error?.response?.data);
    }
  }, [query.error]);

  return query;
};

export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      httpWithAuth.defaults.headers.Authorization = null;
      getQueryClient().removeQueries();
      router.push('/login');
    },
  });
};
