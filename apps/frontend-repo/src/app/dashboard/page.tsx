'use client'

import { Dispatch } from '@reduxjs/toolkit'
import { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AuthGuard from '~/app/auth'
import { Cookie, HttpClient, HttpClientMethod, HttpClientResponse, xRequestToken } from 'pkg-monorepo'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { BaseUrlConfig } from '~/infrastructure/common/configs/url.config'
import { listActionCreator, updateActionCreator } from '~/presentation/stores/reducers/user'
import DashboardView from './__view'
import { UpdateFormSchema, UpdateSchema } from '~/domains/schemas/user.schema'

const Dashboard = () => {
	const list: Record<string, any>[] = useSelector((state: Record<string, any>) => state?.user?.list)
	const update: Record<string, any> = useSelector((state: Record<string, any>) => state?.user?.update)

	const dispatchList: Dispatch = useDispatch()
	const dispatchUpdate: Dispatch = useDispatch()

	const [open, setOpen] = useState(false)
	const [editingRow, setEditingRow] = useState<Record<string, any> | null>(null)

	const fetchUserData = useCallback(async () => {
		try {
			const res: Response = await fetch(BaseUrlConfig.RTR_USER_LIST_URL, { headers: xRequestToken(Cookie.get('token')) })
			const result = await res.json()
			if (result?.code >= 400) {
				if (result?.code === 401) Cookie.remove('token')
				throw res
			}

			dispatchList(listActionCreator({ list: result?.data?.data || [] }))
		} catch (e: any) {
			throw new Error(e)
		}
	}, [dispatchList])

	useEffect(() => {
		fetchUserData()
	}, [])

	const handleEditClick = (row: Record<string, any>) => {
		setEditingRow({ ...row })
		setOpen(true)
	}

	const handleClose = (): void => {
		setOpen(false)
		setEditingRow(null)
	}

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		setValue
	} = useForm<UpdateFormSchema>({ resolver: zodResolver(UpdateSchema) })

	useEffect(() => {
		if (editingRow) {
			setValue('id', editingRow.id)
			setValue('totalAverageWeightRatings', editingRow.totalAverageWeightRatings)
			setValue('numberOfRents', editingRow.numberOfRents)
		}
	}, [editingRow, setValue])

	const updateUserMutation = async (data: UpdateFormSchema) => dispatchUpdate(updateActionCreator({ update: data }))
	const updateUserRouter = async () => {
		try {
			const res: Response = await fetch(BaseUrlConfig.RTR_USER_UPDATE_URL, { method: HttpClientMethod.PUT, body: JSON.stringify(update), headers: xRequestToken(Cookie.get('token')) })
			const result = await res.json()
			console.log('hahah', result)

			if (result?.code >= 400) {
				if (result?.code === 401) Cookie.remove('token')
				throw res
			}
			handleClose()
		} catch (e: any) {
			throw new Error(e)
		}
	}

	const { mutate, isPending, error } = useMutation({ mutationFn: updateUserMutation, onSuccess: updateUserRouter })
	const onSubmit = (data: UpdateFormSchema) => mutate(data)

	const columns: Record<string, any>[] = [
		{ id: 'id', label: 'ID', minWidth: 50 },
		{ id: 'totalAverageWeightRatings', label: 'Total Average Weight Ratings', minWidth: 100 },
		{ id: 'numberOfRents', label: 'Number Of Rents', minWidth: 100, align: 'right' },
		{ id: 'recentlyActive', label: 'Recently Active', minWidth: 150 },
		{ id: 'highPriority', label: 'High Priority', minWidth: 150 },
		{ id: 'actions', label: 'Actions', minWidth: 100, align: 'center' }
	]

	return React.createElement(DashboardView, {
		title: 'Form Update',
		rows: list,
		columns,
		handleEditClick,
		open,
		handleClose,
		editingRow,
		inputs: [
			{
				name: 'totalAverageWeightRatings',
				type: 'text',
				variant: 'outlined',
				field: { ...register('totalAverageWeightRatings') },
				fieldProps: {
					label: 'totalAverageWeightRatings',
					fullWidth: true,
					margin: 'normal',
					className: 'mb-4',
					variant: 'outlined'
				},

				error,
				errors,
				control
			},
			{
				name: 'numberOfRents',
				type: 'text',
				variant: 'outlined',
				field: { ...register('numberOfRents') },
				fieldProps: {
					label: 'numberOfRents',
					fullWidth: true,
					margin: 'normal',
					className: 'mb-6',
					variant: 'outlined'
				},

				error,
				errors,
				control
			}
		],
		control,
		handleSubmit: handleSubmit(onSubmit),
		loading: isPending
	})
}

export default function DashboardPage() {
	return (
		<AuthGuard>
			<Dashboard />
		</AuthGuard>
	)
}
