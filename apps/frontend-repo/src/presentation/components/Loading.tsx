import { useEffect, useState } from 'react'
import { Oval } from 'react-loader-spinner'
import { Backdrop, CircularProgress, LinearProgress } from '@mui/material'

interface LoadingScreenProps {
	fullScreen?: boolean
	type?: 'spinner' | 'oval' | 'linear'
	message?: string
	overlayColor?: string
}

const LoadingScreen = ({ fullScreen = true, type = 'oval', message = 'Loading...', overlayColor = 'bg-black bg-opacity-50' }: LoadingScreenProps) => {
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		if (type === 'linear') {
			const timer = setInterval(() => {
				setProgress((oldProgress) => {
					if (oldProgress === 100) {
						return 0
					}
					return Math.min(oldProgress + 10, 100)
				})
			}, 1500)
			return () => clearInterval(timer)
		}
	}, [type])

	const loaderContent = (
		<div className='flex flex-col items-center justify-center gap-4'>
			{type === 'oval' && (
				<Oval height={60} width={60} color='#3b82f6' wrapperStyle={{}} wrapperClass='' visible={true} ariaLabel='oval-loading' secondaryColor='#93c5fd' strokeWidth={6} strokeWidthSecondary={6} />
			)}

			{type === 'spinner' && <CircularProgress size={60} thickness={5} className='text-blue-500' />}

			{type === 'linear' && (
				<div className='w-full max-w-xs md:max-w-md'>
					<LinearProgress variant='determinate' value={progress} className='h-2 rounded-full' />
				</div>
			)}

			<p className='text-lg font-medium text-gray-700 dark:text-gray-200'>{message}</p>
		</div>
	)

	return fullScreen ? (
		<Backdrop
			open={true}
			className={`flex flex-col ${overlayColor} z-50`}
			sx={{
				zIndex: (theme) => theme.zIndex.drawer + 1
			}}>
			{loaderContent}
		</Backdrop>
	) : (
		<div className='fixed inset-0 flex items-center justify-center z-50'>{loaderContent}</div>
	)
}

export default LoadingScreen
