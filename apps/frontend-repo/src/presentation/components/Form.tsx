import { TextField, Button } from '@mui/material'
import { IFormComponent, IFormInput } from '~/domains/interfaces/form.interface'

const FormComponent: React.FC<any> = (props: IFormComponent): React.ReactNode => {
	return (
		<div className='space-y-4'>
			{props?.inputs?.length > 1 && (
				<>
					{props.inputs.map((input: IFormInput, i: number) => (
						<div key={i} className='mb-4'>
							<TextField
								label={input.name}
								variant={input.variant}
								type={input.type}
								error={!!input.errors[input.name]}
								helperText={<>{input.errors[input.name]?.message}</>}
								InputProps={input.icon}
								{...input.field}
								{...input.fieldProps}
							/>
						</div>
					))}
					{!props?.control && (
						<Button type='submit' variant='contained' color='primary' fullWidth size='large' disabled={props?.loading} sx={{ height: 48, marginTop: 2 }}>
							{props?.loading ? props.spinner() : props?.text}
						</Button>
					)}
				</>
			)}
		</div>
	)
}

export default FormComponent
