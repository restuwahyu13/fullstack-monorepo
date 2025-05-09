import { createSlice, Slice } from '@reduxjs/toolkit'
import { actionCreator, initialState } from '~/presentation/stores/actions/user'

const userSlice: Slice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: actionCreator
})

export const { listActionCreator, updateActionCreator } = userSlice.actions
export default userSlice.reducer
