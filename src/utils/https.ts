import axios, { InternalAxiosRequestConfig } from 'axios';

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
  const accessToken = '';
  if (accessToken !== null) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

http.interceptors.request.use(injectToken, (error) => Promise.reject(error));

export default http;
