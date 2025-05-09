import { configureStore, Store } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import reducer from '~/presentation/stores/reducers'

export const store: Store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
