import { NextRequest, NextResponse } from 'next/server'
import { setCookie } from 'cookies-next/client'

export const middleware = (_req: NextRequest): NextResponse<unknown> => {
	// const { pathname } = new URL(req.url)
	// const isCookie: string | undefined = req.cookies.get('token')?.value

	// if (!isCookie) {
	// 	return NextResponse.rewrite(new URL(pathname, req.url))
	// }

	const res: NextResponse<unknown> = NextResponse.next()
	setCookie('xxx', 'token_value_123', { httpOnly: true, secure: false, path: '/', sameSite: 'lax' })

	return res
}
