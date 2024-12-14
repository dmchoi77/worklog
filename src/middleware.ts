import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AccessToken, RefreshToken } from '~/constants';

export async function middleware(request: NextRequest) {
  const { nextUrl: url } = request;

  const accessToken = request.cookies.get(AccessToken)?.value;
  const refreshToken = request.cookies.get(RefreshToken)?.value;
  const isAuth = !!accessToken && !!refreshToken;

  if (request.nextUrl.pathname === '/login' && isAuth) {
    return NextResponse.redirect(new URL('/today', request.url));
  }

  if (request.nextUrl.pathname === '/' && !isAuth) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (request.nextUrl.pathname !== '/login' && !isAuth) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (request.nextUrl.pathname === '/' && isAuth) {
    return NextResponse.redirect(new URL('/today', request.url));
  }
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico|registration).*)'],
};
