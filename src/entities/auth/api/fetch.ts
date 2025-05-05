import axios from 'axios';
import { CheckEmailPayload, CheckUsernamePayload } from './types';
import { httpWithoutAuth } from '~/shared/utils/http';

/**
 * 이메일 중복확인
 */
export const checkEmail = async ({ email }: CheckEmailPayload) => {
  const { data } = await httpWithoutAuth.get('/users/email/check', {
    params: { email },
  });

  return data;
};

/**
 * 아이디 중복확인
 */
export const checkUsername = async ({ username }: CheckUsernamePayload) => {
  const { data } = await httpWithoutAuth.get('/users/username/check', {
    params: {
      username,
    },
  });
  return data;
};
