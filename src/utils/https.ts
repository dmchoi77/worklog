import axios, { InternalAxiosRequestConfig } from 'axios';

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Credentials': true,
  'X-Requested-With': 'XMLHttpRequest',
};

let accessToken: string | null = null;

const http = axios.create({
  headers,
  withCredentials: true,
});

const injectToken = (
  config: InternalAxiosRequestConfig<any>,
): InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>> => {
  if (accessToken !== null) config.headers.Authorization = accessToken;
  return config;
};

http.interceptors.request.use(injectToken, (error) => Promise.reject(error));

http.interceptors.response.use((response) => {
  accessToken = response.headers.authorization;
  return response;
});

export default http;
