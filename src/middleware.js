import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Only protect /admin/dashboard and its sub-routes
  if (pathname.startsWith('/admin/dashboard')) {
    const token = request.cookies.get('admin_token')?.value;
    const expectedToken = process.env.ADMIN_TOKEN || 'scpc_secure_session_token_12345';

    if (!token || token !== expectedToken) {
      // Redirect to the login page if not authenticated
      const url = request.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
};
