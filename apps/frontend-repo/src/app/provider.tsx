'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from '~/presentation/stores'

export const Providers: React.FC<any> = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
	const queryClient: QueryClient = new QueryClient()
	return (
		<>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			</Provider>
		</>
	)
}
