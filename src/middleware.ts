import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { REFRESH_TOKEN } from '~/constants/cookie';

export async function middleware(request: NextRequest) {
  // const accessToken = request.cookies.get(ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;

  if (request.nextUrl.pathname === '/login' && refreshToken) {
    return NextResponse.redirect(new URL('/today', request.url));
  }

  if (request.nextUrl.pathname === '/' && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (request.nextUrl.pathname !== '/login' && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico|signin).*)'],
};
