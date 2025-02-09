import axios, { AxiosError } from 'axios';
import { useLogout, useReissue } from '../apis/queries';
import { httpWithAuth, httpWithoutAuth } from '../utils/http';

export const useAxiosInterceptor = () => {
  const { mutate: logoutMutation } = useLogout();
  const refreshTokenQuery = useReissue();

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

  const refreshAccessToken = async () => {
    try {
      const { data } = await refreshTokenQuery.refetch();
      return data?.accessToken;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response;
      } else {
        throw Error('Unknown error');
      }
    }
  };

  const responseErrorHandler = async (error: AxiosError) => {
    const originalRequest = error.config as any;
    const { status } = error.response || {};

    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) return enqueueRequest(originalRequest);
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await refreshAccessToken();
        processQueue(null, newAccessToken);
        return httpWithAuth(originalRequest);
      } finally {
        isRefreshing = false;
      }
    }
    if (status === 403) logoutMutation();
    else throw error.response ? error.response.data : 'Unknown error';
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

  httpWithAuth.interceptors.response.use((response) => response, responseErrorHandler);
  httpWithoutAuth.interceptors.response.use((response) => response, responseErrorHandler);
};
