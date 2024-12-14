import { HttpResponse, http } from 'msw';

export const loginHandler = http.post('/api/login', () => {
  return HttpResponse.json({
    accessToken:
      'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIyIiwiaWF0IjoxNzM0MTEwMzc3LCJleHAiOjE3MzQxNTM1NzcsImF1dGhvcml0aWVzIjoiVVNFUiIsImlkIjoiMiIsImxhc3Qtbm90aWNlZC1hdCI6IjIwMjQtMTItMTMgMTc6MTk6MzcifQ.X2meW27ozxVPPeuczEN9zmpsjyM547VjrteXLNImTYDAAVSojDtwUzDxIMXMZAZg',
    refreshToken:
      'eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MzQxMTAzNzcsImV4cCI6MTczNDcxNTE3N30.vUBbOSqYIu54yXUpdWsv6FMN9sICgU6TNq4UQxYAJY4Zg9YWMzYPsATnSHvrrSRO',
  });
});

export const loginFailHandler = http.post('/api/login', () => {
  return HttpResponse.json(
    {
      status: 400,
      code: 'BAD_REQUEST',
      message: '아이디와 비밀번호를 다시 확인해주세요.',
    },
    { status: 400 },
  );
});
