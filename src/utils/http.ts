import * as https from 'https';

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { getRemainExp } from './decodeJWT';

import { ACCESS_TOKEN, REFRESH_TOKEN, TEN_HOURS } from '~/constants/cookie';
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

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log('🚀 ~ file: http.ts:41 ~ error:', error);
    const {
      response: { status },
    } = error;

    if (status === 401) {
      const originalRequest = error.config;
      const refreshToken = getCookie(REFRESH_TOKEN);
      const accessToken = getCookie(ACCESS_TOKEN);
      if (accessToken && !refreshToken) return (location.href = 'login');
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
        if (response.status === 403) return (location.href = 'login');
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data as ILoginResponse;

        if (response.status === 200) {
          setCookie(ACCESS_TOKEN, newAccessToken, {
            secure: true,
            path: '/',
            // maxAge: getRemainExp(newAccessToken),
          });
          setCookie(REFRESH_TOKEN, newRefreshToken, {
            secure: true,
            path: '/',
            maxAge: getRemainExp(newRefreshToken),
          });
          originalRequest.headers = {
            Authorization: `Bearer ${newAccessToken}`,
          };
          http.defaults.headers.common = {
            Authorization: `Bearer ${newAccessToken}`,
          };
          return http(originalRequest);
        }
      } catch (error: any) {
        if ([401, 403, 404].includes(error.response.status)) {
          removeCookie(ACCESS_TOKEN);
          removeCookie(REFRESH_TOKEN);
          return (location.href = '/login');
        }
      }
    }
    throw error.response.data;
  },
);

export default http;
