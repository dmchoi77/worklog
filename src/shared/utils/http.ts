import * as https from 'https';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getCookie } from './cookie';
import { getAccessToken } from './cookieWithServer';
import { AccessToken } from '~/shared/constants';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Credentials': true,
  'X-Requested-With': 'XMLapiWithAuthRequest',
};

const axiosDefaultConfig = {
  baseURL,
  headers,
  withCredentials: true,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
};

export const httpWithoutAuth = axios.create(axiosDefaultConfig);
export const httpWithAuth = axios.create(axiosDefaultConfig);

const injectToken = async (config: InternalAxiosRequestConfig<any>): Promise<InternalAxiosRequestConfig<any>> => {
  let accessToken;
  if (typeof window === 'undefined') {
    accessToken = await getAccessToken();
  } else {
    accessToken = getCookie(AccessToken);
  }

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

httpWithAuth.interceptors.request.use(injectToken, (error) => {
  return Promise.reject(error);
});

interface ErrorResponse {
  status: number;
  message: string;
  code: string;
}

export const commonResponseErrorHandler = (error: unknown) => {
  if (error instanceof AxiosError) {
    const { message, status } = error.response?.data || {};
    const unknownErrorResponse = { status, message, code: 'UNKNOWN_ERROR' };
    if (status === 500) return unknownErrorResponse;
    return { status, ...(error?.response?.data || unknownErrorResponse) } as ErrorResponse;
  }
};
