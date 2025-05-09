import { createSlice, Slice } from '@reduxjs/toolkit'
import { actionCreator, initialState } from '../../actions/auth'

const counterSlice: Slice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: actionCreator
})

export const { loginActionCreator } = counterSlice.actions
export default counterSlice.reducer
