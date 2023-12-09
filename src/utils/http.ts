import { getCookie, setCookie } from '~/utils/cookie';
import axios, { InternalAxiosRequestConfig } from 'axios';
import { ACCESS_TOKEN, ONE_DAY, REFRESH_TOKEN, TEN_HOURS } from '~/constants/cookie';
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
    const {
      config,
      response: { status, data, headers, request },
    } = error;

    if (status === 401) {
      const originalRequest = error.config;
      const refreshToken = getCookie(REFRESH_TOKEN);
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
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data
        .data as ILoginResponse;

      if (response.status === 200) {
        setCookie(ACCESS_TOKEN, newAccessToken, {
          secure: true,
          path: '/',
          maxAge: ONE_DAY,
        });
        setCookie(REFRESH_TOKEN, newRefreshToken, {
          secure: true,
          path: '/',
          maxAge: TEN_HOURS,
        });
        originalRequest.headers = {
          Authorization: `Bearer ${newAccessToken}`,
        };
        http.defaults.headers.common = {
          Authorization: `Bearer ${newAccessToken}`,
        };
        return http(originalRequest);
      }
    }
    throw error;
  },
);

export default http;
