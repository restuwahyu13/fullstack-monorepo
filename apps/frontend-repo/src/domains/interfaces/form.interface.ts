import { FilledInputProps, OutlinedInputProps, InputProps, TextFieldVariants, TextFieldProps } from '@mui/material'
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form'

export interface IFormInput {
	name: string
	field: UseFormRegisterReturn
	fieldProps?: TextFieldProps
	type: React.InputHTMLAttributes<unknown>['type']
	icon?: Partial<FilledInputProps> | Partial<OutlinedInputProps> | Partial<InputProps>
	errors?: FieldErrors<any>
	error?: Error
	variant?: TextFieldVariants
}

export interface IFormComponent<T = any> {
	title?: string
	text: string
	inputs: IFormInput[]
	loading?: boolean
	spinner?: () => React.ReactNode
	handlerSubmit: (data: T) => void
}
