import * as https from 'https';

import axios, { InternalAxiosRequestConfig } from 'axios';

import { ICommonResponse } from '~/types/apis/common.types';
import { ILoginResponse } from '~/types/apis/user.types';

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

const injectToken = async (config: InternalAxiosRequestConfig<any>): Promise<InternalAxiosRequestConfig<any>> => {
  const response = await axios.get('/api/auth');
  const { accessToken } = response.data;
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

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
    console.log('🚀 ~ error:', error);
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

      const response = await axios.get('/api/auth');
      const { refreshToken } = response.data;

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

          originalRequest.headers = { Authorization: `Bearer ${newAccessToken}` };
          http.defaults.headers.common = { Authorization: `Bearer ${newAccessToken}` };

          processQueue(null, newAccessToken);

          return http(originalRequest);
        }
      } catch (error: any) {
        console.log('🚀 ~ error:', error);
        if ([403, 404].includes(error.response.status)) {
          axios.get('/api/logout');
          // return (location.href = 'login');
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
