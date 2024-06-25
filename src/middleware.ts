import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';

import { getSelectorsByUserAgent } from 'react-device-detect';

import { AccessToken, RefreshToken } from '~/constants';

export async function middleware(request: NextRequest) {
  const { ua } = userAgent(request);
  const { isMobileOnly, isDesktop } = getSelectorsByUserAgent(ua);
  const agent = isMobileOnly ? 'mobile' : isDesktop ? 'desktop' : 'unknown';
  const { nextUrl: url } = request;
  url.searchParams.set('agent', agent);

  const accessToken = request.cookies.get(AccessToken)?.value;
  const refreshToken = request.cookies.get(RefreshToken)?.value;
  const isAuth = accessToken && refreshToken;

  if (request.nextUrl.pathname === '/login' && isAuth) {
    return NextResponse.redirect(new URL('/today', request.url));
  }

  if (request.nextUrl.pathname === '/' && !isAuth) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (request.nextUrl.pathname !== '/login' && !isAuth) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico|signin).*)'],
};
