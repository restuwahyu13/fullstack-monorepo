'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Email, Lock } from '@mui/icons-material'
import { useMutation } from '@tanstack/react-query'
import { TailSpin } from 'react-loader-spinner'

import LoginView from '~/app/login/__view'
import { LoginFormSchema, LoginSchema } from '~/domains/schemas/auth.schema'

const mockLoginApi = async (data: LoginFormSchema) => {
	await new Promise((resolve) => setTimeout(resolve, 1500))
	if (data.email === 'user@example.com' && data.password === 'password123') {
		return { success: true }
	}
	throw new Error('Email atau password salah')
}

const Login: React.FC<any> = (): React.ReactNode => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<LoginFormSchema>({
		resolver: zodResolver(LoginSchema)
	})

	const { mutate, isPending, error } = useMutation({
		mutationFn: mockLoginApi,
		onSuccess: () => {}
	})

	const onSubmit = (data: LoginFormSchema) => mutate(data)

	return React.createElement(LoginView, {
		text: 'Login',
		inputs: [
			{
				name: 'email',
				type: 'email',
				variant: 'outlined',
				field: { ...register('email') },
				fieldProps: {
					label: 'Email',
					fullWidth: true,
					margin: 'normal',
					className: 'mb-4',
					variant: 'outlined'
				},
				icon: { startAdornment: <Email className='mr-2 text-gray-500' /> },
				error,
				errors
			},
			{
				name: 'password',
				type: 'password',
				variant: 'outlined',
				field: { ...register('password') },
				fieldProps: {
					label: 'Password',
					fullWidth: true,
					margin: 'normal',
					className: 'mb-6',
					variant: 'outlined'
				},
				icon: { startAdornment: <Lock className='mr-2 text-gray-500' /> },
				error,
				errors
			}
		],
		handlerSubmit: handleSubmit(onSubmit),
		spinner: () => <TailSpin color='#000' height={20} width={20} />,
		loading: isPending
	})
}

export default Login
