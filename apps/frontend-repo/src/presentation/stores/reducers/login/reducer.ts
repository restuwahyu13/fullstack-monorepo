import { createSlice, Slice } from '@reduxjs/toolkit'
import { actionCreator, initialState } from '../../actions/login'

const counterSlice: Slice = createSlice({
	name: 'login',
	initialState: initialState,
	reducers: actionCreator
})

export const { increment, decrement } = counterSlice.actions
export default counterSlice.reducer
