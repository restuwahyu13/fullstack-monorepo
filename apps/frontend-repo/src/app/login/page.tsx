'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Email, Lock } from '@mui/icons-material'
import { useMutation } from '@tanstack/react-query'
import { TailSpin } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { Cookie, logger } from 'pkg-monorepo'
import { useRouter } from 'next/navigation'
import { Dispatch } from '@reduxjs/toolkit'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import LoginView from '~/app/login/__view'
import { LoginFormSchema, LoginSchema } from '~/domains/schemas/auth.schema'
import { loginActionCreator } from '~/presentation/stores/reducers/auth'
import { FirebaseConfig } from '~/infrastructure/common/configs/firebase.config'
import { EFirebaseType } from '~/domains/constants/firebase.constant'
import { Auth, signInWithEmailAndPassword, UserCredential } from 'firebase/auth'
import { EnvConfig } from '~/infrastructure/common/configs/env.config'

const Login: React.FC<any> = (): React.ReactNode => {
	const router: AppRouterInstance = useRouter()
	const dispatch: Dispatch = useDispatch()

	const email: string = useSelector((state: Record<string, any>) => state?.auth?.email)
	const password: string = useSelector((state: Record<string, any>) => state?.auth?.password)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<LoginFormSchema>({
		resolver: zodResolver(LoginSchema)
	})

	const loginAuthMutation = async (data: LoginFormSchema) => dispatch(loginActionCreator({ email: data.email, password: data.password }))
	const authLoginRouter = async () => {
		try {
			const firebaseAuth: Auth = FirebaseConfig.auth(EFirebaseType.CLIENT)

			const userCredential: UserCredential = await signInWithEmailAndPassword(firebaseAuth, email, password)
			if (!userCredential?.user) router.push('/login')

			const token: string = await firebaseAuth.currentUser?.getIdToken()
			Cookie.set('token', token, { path: '/', sameSite: EnvConfig.NODE_ENV === 'production' ? 'lax' : 'strict', secure: EnvConfig.NODE_ENV === 'production', expires: 3600 })

			router.push('/dashboard')
		} catch (e: any) {
			logger(e, 'error')
			throw new Error(e?.message)
		}
	}

	const { mutate, isPending, error } = useMutation({ mutationFn: loginAuthMutation, onSuccess: authLoginRouter })
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
