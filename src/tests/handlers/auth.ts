import { HttpResponse } from 'msw';
import { httpPostHandler } from './utils';

export const loginHandler = httpPostHandler('/api/login')(({ params }) => {
  console.log(params);
  new HttpResponse('test', {
    status: 200,
  });
});
