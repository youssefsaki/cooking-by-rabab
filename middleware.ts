import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

function withPathname(request: NextRequest, response: NextResponse) {
  const pathname = request.nextUrl.pathname;
  // Expose pathname to Server Components via request headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);
  const next = NextResponse.next({
    request: { headers: requestHeaders },
  });
  // Preserve cookies set by auth middleware
  response.cookies.getAll().forEach((cookie) => {
    next.cookies.set(cookie);
  });
  // Also keep response header for debugging
  next.headers.set('x-pathname', pathname);
  return next;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/admin')) {
    const authResponse = await updateSession(request);
    // Redirect responses should pass through unchanged (still tag pathname for login page)
    if (authResponse.status >= 300 && authResponse.status < 400) {
      authResponse.headers.set('x-pathname', pathname);
      return authResponse;
    }
    return withPathname(request, authResponse);
  }

  return withPathname(request, NextResponse.next());
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico)$).*)'],
};
