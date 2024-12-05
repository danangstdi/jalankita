import { NextResponse } from 'next/server'
 
export function middleware(request) {
  const token = request.cookies.get('jalankita_auth_session_key');
  let url= request.nextUrl.pathname;

  if (url.startsWith('/admin-authentication')) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }
  
  if (url.startsWith('/dashboard') || url.startsWith('/lihat-laporan')) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin-authentication', request.url))
    }
  }
}
 
export const config = {
  matcher: ['/dashboard', '/lihat-laporan', '/admin-authentication'],
}