import * as https from 'https';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getCookie } from './cookie';
import { reissue, logout } from '~/apis';
import { AccessToken } from '~/constants';

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
  const accessToken = getCookie(AccessToken);
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const responseErrorHandler = async (error: AxiosError) => {
  const originalRequest = error.config as any;
  const { response } = error;
  if (!response) throw error;
  const { status } = response;
  if (status === 401 && !originalRequest._retry) {
    if (isRefreshing) return enqueueRequest(originalRequest);
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const newAccessToken = await refreshAccessToken();
      httpWithAuth.defaults.headers.common = { Authorization: `Bearer ${newAccessToken}` };
      processQueue(null, newAccessToken);
      return httpWithAuth(originalRequest);
    } catch (error: any) {
      handleRefreshError(error);
    } finally {
      isRefreshing = false;
    }
  } else throw error.response ? error.response.data : 'Unknown error';
};

const enqueueRequest = async (originalRequest: any) => {
  try {
    const token = await new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    });
    originalRequest.headers['Authorization'] = 'Bearer ' + token;
    return await axios(originalRequest);
  } catch (error) {
    return Promise.reject(error);
  }
};

const refreshAccessToken = async () => {
  try {
    const response = await reissue();
    return response.data.accessToken;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    } else {
      throw Error('Unknown error');
    }
  }
};

const handleRefreshError = async (error: any) => {
  try {
    if ([401, 403, 404].includes(error.status)) {
      await logout();
      window.location.href = '/login';
    } else {
      processQueue(error, null);
    }
  } catch (error) {
    processQueue(error, null);
  }
};

httpWithAuth.interceptors.request.use(injectToken, (error) => Promise.reject(error));
httpWithAuth.interceptors.response.use((response) => response, responseErrorHandler);

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
