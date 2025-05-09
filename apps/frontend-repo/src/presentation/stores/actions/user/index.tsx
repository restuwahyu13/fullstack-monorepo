import { PayloadAction } from '@reduxjs/toolkit'
import { IReduxUserState } from '~/domains/interfaces/user.interface'

export enum ActionType {
	LIST = 'user/listActionCreator',
	UPDATE = 'user/updateActionCreator'
}

export const initialState: IReduxUserState = {
	list: [],
	update: {}
}

export const actionCreator: any = {
	listActionCreator: (state: IReduxUserState, action: PayloadAction<IReduxUserState, ActionType>) => {
		if (action.type === ActionType.LIST) {
			state.list = action.payload.list
		} else {
			state.list = []
		}
	},
	updateActionCreator: (state: IReduxUserState, action: PayloadAction<IReduxUserState, ActionType>) => {
		if (action.type === ActionType.UPDATE) {
			state.update = action.payload.update
		} else {
			state.update = {}
		}
	}
}
