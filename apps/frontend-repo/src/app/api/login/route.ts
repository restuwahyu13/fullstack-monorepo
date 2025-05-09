import { NextRequest, NextResponse } from 'next/server'
import { HttpClient, HttpClientMethod, HttpClientType, HttpClientResponse } from 'pkg-monorepo'

import { BaseUrlConfig } from '~/infrastructure/common/configs/url.config'

export const POST = async (req: NextRequest) => {
	try {
		const token: string = req.headers.get('x-request-token') || ''
		if (!token) return NextResponse.json({ code: 401, error: 'Unauthorized invalid token' })

		const res: HttpClientResponse = await HttpClient.request({
			url: BaseUrlConfig.AUTH_VERIFY_URL,
			method: HttpClientMethod.POST,
			type: HttpClientType.BODY,
			data: { accessToken: token }
		})
		if (res.code >= 400) throw res

		return NextResponse.json(res)
	} catch (e: any) {
		return NextResponse.json(e)
	}
}

export const GET = async (req: NextRequest) => {
	try {
		const res: HttpClientResponse = await HttpClient.request({
			url: BaseUrlConfig.AUTH_VERIFY_URL,
			method: HttpClientMethod.POST,
			type: HttpClientType.BODY,
			data: { accessToken: req.body }
		})
		if (res.code >= 400) throw res

		return NextResponse.json(res)
	} catch (e: any) {
		return NextResponse.json(e)
	}
}
