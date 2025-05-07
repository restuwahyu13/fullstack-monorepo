import { IsOptional, IsNumberString, IsString, IsEnum } from 'class-validator'
import { ESortQuery } from '~/domain/enums/common.enum'

export class CommonFilterQueryDTO {
	@IsOptional()
	@IsNumberString()
	page?: number

	@IsOptional()
	@IsNumberString()
	limit?: number

	@IsOptional()
	@IsString()
	search?: string

	@IsOptional()
	@IsEnum(ESortQuery)
	sort?: ESortQuery

	@IsOptional()
	@IsString()
	sort_by?: any
}
