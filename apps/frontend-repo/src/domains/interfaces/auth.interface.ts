import { PayloadAction } from '@reduxjs/toolkit'

export interface IReduxLoginState {
	count: number
}

export interface IReduxLoginActionCreator {
	increment: (state: IReduxLoginState, action: PayloadAction<IReduxLoginState, string>) => void
	decrement: (state: IReduxLoginState, action: PayloadAction<IReduxLoginState, string>) => void
}
