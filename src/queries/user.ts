import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { AxiosError } from 'axios';

import { checkEmail, checkUsername, login, logout, signIn } from '~/apis/user';
import { useUserInfoState } from '~/stores/useUserInfoStore';
import http from '~/utils/http';

import type { ICommonResponse, ILoginRequest, ISignInRequest } from '~/types';

const userQueryKeys = createQueryKeys('user', {
  refreshAccessToken: ['refreshAccessToken'],
  checkEmail: ['checkEmail'],
  checkUsername: ['checkUsername'],
});

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ username, password }: ILoginRequest) => login({ username, password }),
  });
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: ({ username, email, password, passwordCheck }: ISignInRequest) =>
      signIn({ username, email, password, passwordCheck }),
  });
};

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

// export const useRefreshAccessToken = (refreshToken: string) => {
//   const query = useQuery({
//     queryKey: userQueryKeys.refreshAccessToken.queryKey,
//     queryFn: () => refreshAccessToken(refreshToken),
//   });

//   useEffect(() => {
//     if (!query.data) {
//       // removeCookie(ACCESS_TOKEN, { path: '/' });
//       // removeCookie(REFRESH_TOKEN, { path: '/' });
//       // http.defaults.headers.Authorization = null;
//       return;
//     }
//     if (query.isSuccess) {
//       const { refreshToken, accessToken } = query.data;

//       setCookie(REFRESH_TOKEN, refreshToken, {
//         maxAge: getRemainExp(refreshToken),
//       });
//       setCookie(ACCESS_TOKEN, accessToken);
//       http.defaults.headers.Authorization = `Bearer ${accessToken}`;
//     }
//   }, [query.data]);

//   return query;
// };

export const useLogout = () => {
  const router = useRouter();
  const resetUserInfo = useUserInfoState((state) => state.reset);

  return useMutation({
    mutationFn: () => logout(),
    onSettled: () => {
      http.defaults.headers.Authorization = null;
      resetUserInfo();
      router.push('/login');
    },
  });
};
