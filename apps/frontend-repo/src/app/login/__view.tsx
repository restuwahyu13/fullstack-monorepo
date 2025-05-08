import { Container, Box, Typography } from '@mui/material'
import { IFormComponent } from '~/domains/interfaces/form.interface'
import Form from '~/presentation/components/Form'

const LoginView: React.FC<any> = (props: IFormComponent): React.ReactNode => {
	return (
		<>
			<Container maxWidth='sm' className='flex items-center justify-center min-h-screen'>
				<Box component='form' onSubmit={props.handlerSubmit} className='w-full p-6 shadow-lg rounded-lg bg-white' noValidate>
					<Typography variant='h4' component='h1' className='text-center mb-6'>
						Login
					</Typography>
					<Form {...props} />
				</Box>
			</Container>
		</>
	)
}

export default LoginView
