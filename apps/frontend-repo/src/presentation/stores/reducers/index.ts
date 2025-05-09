import { combineReducers } from '@reduxjs/toolkit'

import authReducer from '~/presentation/stores/reducers/auth'
import userReducer from '~/presentation/stores/reducers/user'

export default combineReducers({
	auth: authReducer,
	user: userReducer
})
