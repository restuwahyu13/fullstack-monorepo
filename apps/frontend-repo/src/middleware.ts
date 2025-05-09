import { NextRequest, NextResponse } from 'next/server'

export const middleware = (req: NextRequest): NextResponse<unknown> => {
	const { pathname } = new URL(req.url)
	const isCookie: string | undefined = req.cookies.get('token')?.value

	if (pathname === '/dashboard' && !isCookie) {
		return NextResponse.rewrite(new URL(pathname, req.url))
	} else if (pathname === '/dashboard' && isCookie) {
		return NextResponse.rewrite(new URL(pathname, req.url))
	}
}
