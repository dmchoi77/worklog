'use server';
import { cookies } from 'next/headers';
import { AccessToken } from '~/shared/constants';

export const getAccessToken = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(AccessToken)?.value;
  return accessToken;
};
