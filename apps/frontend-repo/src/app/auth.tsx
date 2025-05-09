'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { HttpClient, Cookie, xRequestToken, HttpClientResponse } from 'pkg-monorepo'
import { BaseUrlConfig } from '~/infrastructure/common/configs/url.config'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import LoadingScreen from '~/presentation/components/Loading'

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }): React.JSX.Element => {
	const router: AppRouterInstance = useRouter()
	const [authStatus, setAuthStatus] = useState<'checking' | 'authenticated' | 'unauthenticated'>('checking')

	const authCheckToken = async (): Promise<void> => {
		try {
			const res: HttpClientResponse = await HttpClient.request({
				url: BaseUrlConfig.RTR_AUTH_VERIFY_URL,
				headers: xRequestToken(Cookie.get('token'))
			})

			if (res?.code >= 400 || res?.data?.code >= 400) throw new Error('Invalid credentials')
			else setAuthStatus('authenticated')
		} catch (e: any) {
			setAuthStatus('unauthenticated')
			setTimeout(() => {
				Cookie.remove('token')
				router.push('/login')
			}, 1000)
		}
	}

	useEffect(() => {
		authCheckToken()
	}, [])

	if (authStatus === 'checking') return <LoadingScreen />
	if (authStatus === 'unauthenticated') return null

	return <>{children}</>
}

export default AuthGuard
