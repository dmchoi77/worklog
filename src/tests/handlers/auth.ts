import { HttpResponse, http } from 'msw';

export const loginHandler = http.post('/api/login', () => {
  return HttpResponse.json({
    accessToken: '1',
    refreshToken: '1',
  });
});
