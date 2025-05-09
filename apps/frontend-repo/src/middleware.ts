import { NextConfig } from 'next'
import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	const path: string = request.nextUrl.pathname
	const token: string = request.cookies.get('token')?.value

	if (path.startsWith('/_next') || path.includes('.') || path.startsWith('/api/auth') || path.startsWith('/login')) {
		return NextResponse.next()
	}

	if (path.startsWith('/api')) {
		if (!token) {
			return new NextResponse(JSON.stringify({ code: 401, message: 'Unauthorized' }), { status: 401, headers: { 'content-type': 'application/json' } })
		}
		return NextResponse.next()
	}

	if (!token && !path.startsWith('/auth')) {
		const login: URL = new URL('/login', request.url)
		login.searchParams.set('from', path)

		return NextResponse.redirect(login)
	}

	return NextResponse.next()
}

export const config: NextConfig = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}
