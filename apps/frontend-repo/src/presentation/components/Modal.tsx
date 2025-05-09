import React from 'react'
import { Close } from '@mui/icons-material'
import { Dialog, DialogTitle, IconButton, DialogContent, DialogActions, Button, CircularProgress } from '@mui/material'
import Form from '~/presentation/components/Form'

const Modal: React.FC<any> = (props: Record<string, any>) => {
	return (
		<>
			<Dialog open={props?.open} onClose={props?.handleClose} fullWidth maxWidth='sm'>
				<form onSubmit={props?.handleSubmit}>
					<DialogTitle className='flex justify-between items-center bg-blue-50'>
						<span>{props?.title}</span>
						<IconButton onClick={props.handleClose}>
							<Close />
						</IconButton>
					</DialogTitle>
					<DialogContent className='py-4'>
						<input type='hidden' {...props?.control?.register('id')} />
						<Form {...props} />
					</DialogContent>
					<DialogActions className='px-6 py-4'>
						<Button onClick={props?.handleClose} variant='outlined' className='mr-2 border-gray-400 text-gray-600'>
							Cancel
						</Button>
						<Button type='submit' variant='contained' className='bg-blue-600 hover:bg-blue-700 text-white' disabled={props?.loading}>
							{props?.loading ? <CircularProgress size={24} color='inherit' /> : 'Save'}
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	)
}

export default Modal
