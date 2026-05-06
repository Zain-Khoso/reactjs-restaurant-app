import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/utils/auth';

export const runtime = 'nodejs';

const PROTECTED_ROUTES = ['/account', '/order'];
const ADMIN_ROUTES = ['/admin'];
const AUTH_ROUTES = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
  const isAdmin = ADMIN_ROUTES.some((r) => pathname.startsWith(r));
  const isAuth = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  if (!isProtected && !isAdmin && !isAuth) {
    return NextResponse.next();
  }

  let session = null;

  try {
    session = await auth.api.getSession({
      headers: request.headers,
    });
  } catch {
    // If session fetch fails completely, allow the request through
    // rather than incorrectly redirecting a valid user
    if (isAuth) return NextResponse.next();
    if (isProtected || isAdmin) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
    return NextResponse.next();
  }

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
