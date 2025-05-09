import { PayloadAction } from '@reduxjs/toolkit'
import { IReduxLoginState } from '~/domains/interfaces/auth.interface'

export enum ActionType {
	LOGIN = 'auth/loginActionCreator'
}

export const initialState: IReduxLoginState = {
	email: '',
	password: ''
}

export const actionCreator: any = {
	loginActionCreator: (state: IReduxLoginState, action: PayloadAction<IReduxLoginState, ActionType>) => {
		if (action.type === ActionType.LOGIN) {
			state.email = action.payload.email
			state.password = action.payload.password
		}
	}
}
