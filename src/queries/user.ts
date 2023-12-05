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

const userQueryKeys = createQueryKeys('user', {
  checkDuplicationEmail: ['checkDuplicationEmail'],
  checkDuplicationUsername: ['checkDuplicationUsername'],
});

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ username, password }: ILoginRequest) => login({ username, password }),
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data as ILoginResponse;
      authToken.setToken(accessToken);
      sessionStorage.setItem('authKey', refreshToken);
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

export const useRefreshAccessToken = () =>
  useMutation({
    mutationFn: () => refreshAccessToken(),
    onSuccess: (data) => {
      const { refreshToken, accessToken } = data as ILoginResponse;

      sessionStorage.removeItem('authKey');
      sessionStorage.setItem('authKey', refreshToken);
      authToken.setToken(accessToken);
      
    },
  });
