import axios from 'axios';

import { ILoginRequest, ISignInRequest } from '~/types/apis/user.types';

const baseURL = '';
export const login = ({ username, password }: ILoginRequest) => {
  return axios.post(
    '/users/login',
    {
      username,
      password,
    },
    {
      baseURL,
    },
  );
};

export const signIn = ({ username, email, password, passwordCheck }: ISignInRequest) => {
  return axios.post(
    '/users',
    {
      username,
      email,
      password,
      passwordCheck,
    },
    {
      baseURL,
    },
  );
};
