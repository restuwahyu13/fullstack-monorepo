import { PayloadAction } from '@reduxjs/toolkit'
import { IReduxLoginState } from '~/domains/interfaces/auth.interface'

export enum ActionType {
	INC = 'login/increment',
	DEC = 'login/decrement'
}

export const initialState: IReduxLoginState = {
	count: 0
}

export const actionCreator: any = {
	increment: (state: IReduxLoginState, action: PayloadAction<IReduxLoginState, ActionType>) => {
		if (action.type === ActionType.INC) {
			state.count += action.payload.count
		}
	},
	decrement: (state: IReduxLoginState, action: PayloadAction<IReduxLoginState, ActionType>) => {
		if (action.type === ActionType.DEC) {
			state.count -= action.payload.count
		}
	}
}
