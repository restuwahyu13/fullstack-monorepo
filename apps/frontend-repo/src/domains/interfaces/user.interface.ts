import { PayloadAction } from '@reduxjs/toolkit'

export interface IReduxUserState {
	list: Record<string, any>[]
	update: Record<string, any>
}

export interface IReduxLoginActionCreator {
	listActionCreator: (state: IReduxUserState, action: PayloadAction<IReduxUserState, string>) => void
	updateAcountCreator: (state: IReduxUserState, action: PayloadAction<IReduxUserState, string>) => void
}
