import { useMutation } from '@tanstack/react-query';
import { login } from '~/apis/user';
import { ILoginRequest } from '~/types/apis/user.types';

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ username, password }: ILoginRequest) => login({ username, password }),
    onSuccess: (response) => {},
    // onError: (error) => alert(error),
  });
};
