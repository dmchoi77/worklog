'use server';
import { cookies } from 'next/headers';
import { AccessToken, RefreshToken } from '../constants';

export const getAccessToken = async () => {
  const accessToken = (await cookies()).get(AccessToken)?.value;

  return accessToken;
};

export const setAccessToken = async (accessToken: string) => {
  const headers = new Headers();
  headers.set('set-cookie', `${AccessToken}=${accessToken}; path=/; samesite=Lax; secure=true;`);

  return headers;
};

export const setRefreshToken = async (refreshToken: string) => {
  const headers = new Headers();
  headers.append('set-cookie', `${RefreshToken}=${refreshToken}; path=/; samesite=Lax; httponly; secure=true;`);

  return headers;
};

export const setTokens = async (accessToken: string, refreshToken: string) => {
  const headers = new Headers();
  headers.set('set-cookie', `${AccessToken}=${accessToken}; path=/; samesite=Lax; secure=true;`);
  headers.append('set-cookie', `${RefreshToken}=${refreshToken}; path=/; samesite=Lax; httponly; secure=true;`);

  return headers;
};

export const removeTokens = async () => {
  const headers = new Headers();
  headers.set('set-cookie', '${RefreshToken}=; Path=/; Max-Age=0');
  headers.append('set-cookie', '${AccessToken}=; Path=/; Max-Age=0');

  return headers;
};
