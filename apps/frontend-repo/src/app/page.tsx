'use client'

import { Fragment, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Cookie } from 'pkg-monorepo'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

const RootPage: React.FC<any> = (): React.ReactNode => {
	const router: AppRouterInstance = useRouter()

	useEffect(() => {
		if (!Cookie.get('token')) {
			router.push('/login')
		} else {
			router.push('/dashboard')
		}
	}, [router])

	return <Fragment />
}

export default RootPage
