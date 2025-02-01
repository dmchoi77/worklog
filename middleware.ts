import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AccessToken, RefreshToken } from '~/shared/constants';
import { getTodayDate } from '~/shared/utils/date';

export async function middleware(request: NextRequest) {
  const todayDate = getTodayDate();

  const { nextUrl: url } = request;

  const accessToken = request.cookies.get(AccessToken)?.value;
  const refreshToken = request.cookies.get(RefreshToken)?.value;
  const isAuth = !!accessToken && !!refreshToken;

  if (request.nextUrl.pathname === '/login' && isAuth) {
    return NextResponse.redirect(new URL(`/content/${todayDate}`, request.url));
  }

  if (request.nextUrl.pathname === '/' && !isAuth) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (request.nextUrl.pathname !== '/login' && !isAuth) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (request.nextUrl.pathname === '/' && isAuth) {
    return NextResponse.redirect(new URL(`/content/${todayDate}`, request.url));
  }
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico|registration).*)'],
};
