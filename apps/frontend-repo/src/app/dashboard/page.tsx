'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { HttpClient } from 'pkg-monorepo'

import { BaseUrlConfig } from '~/infrastructure/common/configs/url.config'

const Dashboard: React.FC<any> = (): React.ReactNode => {
	const router = useRouter()

	const authLoginRouter = async () => {
		try {
			const res = await HttpClient.request({
				url: BaseUrlConfig.RTR_LOGIN_URL,
				headers: {
					'X-Request-Token': 'abcd'
				}
			})

			if (res.code >= 400) router.push('/login')
		} catch (e: any) {
			throw new Error(e?.error)
		}
	}

	useEffect(() => {
		authLoginRouter()
	}, [])

	return <div>Hello world dashboard</div>
}

export default Dashboard
