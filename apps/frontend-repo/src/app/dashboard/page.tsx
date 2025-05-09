'use client'

import { Dispatch } from '@reduxjs/toolkit'
import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AuthGuard from '~/app/auth'
import { Cookie, HttpClient, HttpClientResponse, xRequestToken } from 'pkg-monorepo'
import { BaseUrlConfig } from '~/infrastructure/common/configs/url.config'
import { listActionCreator } from '~/presentation/stores/reducers/user'

const Dashboard = () => {
	const list: Record<string, any>[] = useSelector((state: Record<string, any>) => state?.user?.list)
	const dispatch: Dispatch = useDispatch()

	const fetchUserData = useCallback(async () => {
		try {
			const res: HttpClientResponse = await HttpClient.request({
				url: BaseUrlConfig.RTR_USER_LIST_URL,
				headers: xRequestToken(Cookie.get('token'))
			})

			if (res?.code >= 400 || res?.data?.code >= 400) throw res
			dispatch(listActionCreator({ list: res?.data?.data?.data || [] }))
		} catch (e: any) {
			throw new Error(e)
		}
	}, [dispatch])

	useEffect(() => {
		fetchUserData()
	}, [fetchUserData])

	return (
		<div className='mt-12'>
			<h1 className='text-3xl font-bold underline text-center'>Welcome To Dashboard</h1>
			<pre className='mt-4 p-4 bg-gray-100 rounded'>{JSON.stringify(list || 'No user data available', null, 2)}</pre>
		</div>
	)
}

export default function DashboardPage() {
	return (
		<AuthGuard>
			<Dashboard />
		</AuthGuard>
	)
}
