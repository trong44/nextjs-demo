import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        if (!request.cookies.has('auth-token')) {
            return NextResponse.redirect(new URL('login', request.url))
        }
    }
    if (request.nextUrl.pathname.startsWith('/login')) {
        if (request.cookies.has('auth-token')) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }
}