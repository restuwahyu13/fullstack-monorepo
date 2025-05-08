// import Login from '~/app/login'

// export default function Page() {
// 	return <Login />
// }

// app/page.tsx or any client component
'use client'

import { Dispatch } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '~/presentation/stores'
import { increment } from '~/presentation/stores/reducers/login/reducer'

export default function HomePage() {
	const count = useSelector((state: RootState) => state.login.count)
	const dispatch: Dispatch = useDispatch()

	return (
		<div>
			<h1>Count: {count}</h1>
			<button onClick={() => dispatch(increment({ count: 1 }))} className='bg-blue-500'>
				Increment
			</button>
		</div>
	)
}
