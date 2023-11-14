import axios from 'axios';

import { ILoginRequest } from '~/types/apis/user.types';

export const login = ({ username, password }: ILoginRequest) => {
  return axios.post(
    '/users/login',
    {
      username,
      password,
    },
    {
      baseURL: '/worklog',
    },
  );
};
