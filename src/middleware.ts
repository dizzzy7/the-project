import { NextRequest, NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import { locales, defaultLocale } from './i18n/config';

const PUBLIC_FILE = /\.(.*)$/;

//
function detectLocale(request: NextRequest): string {
  const headers = Object.fromEntries(request.headers.entries());
  const negotiator = new Negotiator({ headers });
  const preferred = negotiator.language(locales);
  return preferred || defaultLocale;
}

export default function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (
    PUBLIC_FILE.test(request.nextUrl.pathname) ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/_next')
  ) {
    return response;
  }

  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;

  if (!cookieLocale) {
    const detected = detectLocale(request);
    response.cookies.set('NEXT_LOCALE', detected);
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
