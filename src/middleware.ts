import { NextRequest, NextResponse } from 'next/server';
import { betterFetch } from '@better-fetch/fetch';
import type { Session } from '@/utils/auth';

const PROTECTED_ROUTES = ['/account', '/order'];
const ADMIN_ROUTES = ['/admin'];
const AUTH_ROUTES = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
  const isAdmin = ADMIN_ROUTES.some((r) => pathname.startsWith(r));
  const isAuth = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  // Skip middleware if route doesn't need protection
  if (!isProtected && !isAdmin && !isAuth) {
    return NextResponse.next();
  }

  // Fetch session from Better Auth API — no Prisma, no Node APIs
  const { data: session } = await betterFetch<Session>('/api/auth/get-session', {
    baseURL: request.nextUrl.origin,
    headers: {
      cookie: request.headers.get('cookie') ?? '',
    },
  });

  const isAuthenticated = !!session?.user;
  const isAdminUser = session?.user?.role === 'ADMIN';

  // Redirect authenticated users away from auth pages
  if (isAuth) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Protect customer routes
  if (isProtected) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
    return NextResponse.next();
  }

  // Protect admin routes
  if (isAdmin) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
    if (!isAdminUser) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|brand.png).*)'],
};
