import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/constants/cookie';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;
  const isAuth = accessToken && refreshToken;

  // if (request.nextUrl.pathname === '/login' && isAuth) {
  //   return NextResponse.redirect(new URL('/today', request.url));
  // }

  // if (request.nextUrl.pathname === '/' && !isAuth) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  // if (request.nextUrl.pathname !== '/login' && !isAuth) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico|signin).*)'],
};
