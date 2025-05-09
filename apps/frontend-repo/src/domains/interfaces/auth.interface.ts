import { PayloadAction } from '@reduxjs/toolkit'

export interface IReduxLoginState {
	email: string
	password: string
}

export interface IReduxLoginActionCreator {
	login: (state: IReduxLoginState, action: PayloadAction<IReduxLoginState, string>) => void
}
