import { NextResponse } from 'next/server';

export async function middleware(req) {
  // Let the client handle auth state - middleware disabled for now
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
