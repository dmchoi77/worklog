'use server';
import { cookies } from 'next/headers';
import { AccessToken } from '../constants';

export const getAccessToken = async () => {
  const accessToken = await cookies().get(AccessToken)?.value;

  return accessToken;
};
