import { FilledInputProps, OutlinedInputProps, InputProps, TextFieldVariants, TextFieldProps } from '@mui/material'
import { Control, FieldErrors, FieldValues, UseFormRegisterReturn } from 'react-hook-form'

export interface IFormInput {
	name: string
	field: UseFormRegisterReturn
	fieldProps?: TextFieldProps
	type: React.InputHTMLAttributes<unknown>['type']
	icon?: Partial<FilledInputProps> | Partial<OutlinedInputProps> | Partial<InputProps>
	errors?: FieldErrors<any>
	error?: Error
	variant?: TextFieldVariants
	control?: Control<FieldValues, any, FieldValues>
}

export interface IFormComponent<T = any> {
	title?: string
	text: string
	inputs: IFormInput[]
	loading?: boolean
	spinner?: () => React.ReactNode
	handlerSubmit: (data: T) => void
	control?: Control<FieldValues, any, FieldValues>
}
