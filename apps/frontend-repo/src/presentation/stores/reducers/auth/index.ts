import { createSlice, Slice } from '@reduxjs/toolkit'
import { actionCreator, initialState } from '~/presentation/stores/actions/auth'

const authSlice: Slice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: actionCreator
})

export const { loginActionCreator } = authSlice.actions
export default authSlice.reducer
