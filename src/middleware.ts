
import { NextRequest, NextResponse } from "next/server"
import { auth } from "./auth"

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const session = await auth()
    if (!session) {
      return NextResponse.redirect(new URL('/api/auth/signin', request.url))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}