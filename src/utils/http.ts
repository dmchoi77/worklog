import * as https from 'https';

import axios, { InternalAxiosRequestConfig } from 'axios';

import { getRemainExp } from './decodeJWT';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/constants/cookie';
import { ICommonResponse } from '~/types/apis/common.types';
import { ILoginResponse } from '~/types/apis/user.types';
import { getCookie, removeCookie, setCookie } from '~/utils/cookie';

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Credentials': true,
  'X-Requested-With': 'XMLHttpRequest',
};

const http = axios.create({
  headers,
  withCredentials: true,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

const injectToken = (
  config: InternalAxiosRequestConfig<any>,
): InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>> => {
  const accessToken = getCookie(ACCESS_TOKEN);
  if (!!accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

http.interceptors.request.use(injectToken, (error) => Promise.reject(error));

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

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const {
      response: { status },
    } = error;
    if (status === 401 && !originalRequest._retry) {
      if (typeof window === 'undefined') return;
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return axios(originalRequest);
          })
          .catch((error) => {
            return Promise.reject(error);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getCookie(REFRESH_TOKEN);
      try {
        const response = await axios.post<ICommonResponse<ILoginResponse>>(
          '/users/reissue',
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
            baseURL: process.env.NEXT_PUBLIC_API_URL,
          },
        );
        if (response.status === 200) {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data as ILoginResponse;
          setCookie(ACCESS_TOKEN, newAccessToken, { secure: true, path: '/' });
          setCookie(REFRESH_TOKEN, newRefreshToken, { secure: true, path: '/', maxAge: getRemainExp(newRefreshToken) });

          originalRequest.headers = { Authorization: `Bearer ${newAccessToken}` };
          http.defaults.headers.common = { Authorization: `Bearer ${newAccessToken}` };

          processQueue(null, newAccessToken);

          return http(originalRequest);
        }
      } catch (error: any) {
        if ([403, 404].includes(error.response.status)) {
          removeCookie(REFRESH_TOKEN, { path: '/' });
          removeCookie(ACCESS_TOKEN, { path: '/' });
          return (location.href = 'login');
        }
        processQueue(error, null);
      } finally {
        isRefreshing = false;
      }
    }
    throw error.response.data;
  },
);

export default http;
