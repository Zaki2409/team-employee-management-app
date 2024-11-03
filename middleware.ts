import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import type { NextRequest } from 'next/server';
import { authOptions } from './app/api/auth/[...nextauth]/route';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Get the session using the request object

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
 const session = await getServerSession(authOptions);
  // Redirect to login if no valid session is found
 
  if(!token || !session) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Log the session for debugging
  console.log('token:', token);
  console.log('Session:', session);

  return NextResponse.next();
}

// Specify the paths to apply this middleware
export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'],
};
