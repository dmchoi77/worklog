import { useMutation } from '@tanstack/react-query';
import { login, signIn } from '~/apis/user';
import { ILoginRequest, ISignInRequest } from '~/types/apis/user.types';

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ username, password }: ILoginRequest) => login({ username, password }),
    onSuccess: (response) => {},
    // onError: (error) => alert(error),
  });
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: ({ username, email, password, passwordCheck }: ISignInRequest) =>
      signIn({ username, email, password, passwordCheck }),
    onSuccess: (response) => {},
  });
};
