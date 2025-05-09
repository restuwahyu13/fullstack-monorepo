import { NextRequest, NextResponse } from 'next/server'
import { HttpClient, HttpClientResponse, authBearer } from 'pkg-monorepo'

import { BaseUrlConfig } from '~/infrastructure/common/configs/url.config'

export const GET = async (req: NextRequest) => {
	try {
		const token: string = req.headers.get('x-request-token') || ''
		if (!token) return NextResponse.json({ code: 401, error: 'Unauthorized invalid token' })

		const res: HttpClientResponse = await HttpClient.request({ url: BaseUrlConfig.USER_URL, headers: authBearer(token) })
		if (res.code >= 400) throw res

		return NextResponse.json(res)
	} catch (e: any) {
		return NextResponse.json(e)
	}
}
