import axios from 'axios';
import { CheckEmailPayload, CheckUsernamePayload, SignInPayload } from './types';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const signIn = ({ username, email, password, passwordCheck }: SignInPayload) => {
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

/**
 * 이메일 중복확인
 */
export const checkEmail = async ({ email }: CheckEmailPayload) => {
  const { data } = await axios.get('/users/email/check', {
    baseURL,
    params: { email },
  });

  return data;
};

/**
 * 아이디 중복확인
 */
export const checkUsername = async ({ username }: CheckUsernamePayload) => {
  const { data } = await axios.get('/users/username/check', {
    baseURL,
    params: {
      username,
    },
  });
  return data;
};
