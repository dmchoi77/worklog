import { HttpResponse, HttpResponseResolver, http } from 'msw';
import { setupWorker } from 'msw/browser';

const baseURL = process.env.NEXT_PUBLIC_API_URL;
// const baseURL = 'http://localhost:6006';

const appendBaseUrl = (endpoint: string) => `${baseURL}${endpoint}`;

const generateHttpHandler =
  (method: Exclude<keyof typeof http, 'all' | 'head' | 'options'>) =>
  (endpoint: string) =>
  (resolver: HttpResponseResolver) =>
    setupWorker(http[method](appendBaseUrl(endpoint), resolver));

export const httpGetHandler = generateHttpHandler('get');

export const httpPostHandler = generateHttpHandler('post');

export const httpPutHandler = generateHttpHandler('put');

export const httpDeleteHandler = generateHttpHandler('delete');

export const httpPatchHandler = generateHttpHandler('patch');
