import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { setCookie } from './utils/cookie';

export async function middleware(request: NextRequest) {
  // console.log('미들웨어실행');
  // const accessToken = authToken.getToken();
  // const refreshToken = request.cookies.get('refreshToken')?.value;
  // console.log('🚀 ~ file: middleware.ts:11 ~ middleware ~ accessToken:', accessToken);
  // if (refreshToken && !accessToken) {
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/reissue`, {
  //       method: 'POST',
  //       headers: {
  //         Refresh: refreshToken,
  //       },
  //     });
  //     const data = await response.json();
  //     if (data.status === 200) {
  //       setCookie('refreshToken', data.data?.refreshToken);
  //       authToken.setToken(data.data?.accessToken);
  //     } else throw data;
  //   } catch (e) {
  //     console.log('🚀 ~ file: middleware.ts:17 ~ middleware ~ e:', e);
  //   }
  // }
  // if (!refreshToken && !accessToken) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }
  // if (!accessToken && refreshToken) {
  // }
}

export const config = {
  matcher: ['/'],
};
