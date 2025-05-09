'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Cookie } from 'pkg-monorepo'

import LoadingScreen from '~/presentation/components/Loading'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const token = Cookie.get('token')
		if (token) setTimeout(() => setLoading(false), 2000)
	}, [router])

	if (loading) return <LoadingScreen />

	return <>{!loading && children}</>
}

export default AuthGuard
