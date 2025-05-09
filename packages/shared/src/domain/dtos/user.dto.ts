import { IsBase64, IsNotEmpty, IsNumber, IsOptional, Matches } from 'class-validator'
import { CommonFilterQueryDTO } from '~/domain/dtos/common.dto'

export class ParamsUserIdDTO {
	@IsNotEmpty()
	@IsBase64()
	id: string
}

export class QueryUserDTO extends CommonFilterQueryDTO {
	filter?: any
}

export class CreateUserDTO {
	@Matches(/^-?\d*\.?\d+$/)
	totalAverageWeightRatings: string

	@IsNumber({ allowInfinity: false, allowNaN: false })
	numberOfRents: number

	@IsOptional()
	@IsNumber({ allowInfinity: false, allowNaN: false })
	recentlyActive: number

	@IsNumber({ allowInfinity: false, allowNaN: false })
	@IsOptional()
	highPriority: number
}

export class UpdateUserDTO {
	@Matches(/^-?\d*\.?\d+$/)
	totalAverageWeightRatings: string

	@IsNumber({ allowInfinity: false, allowNaN: false })
	numberOfRents: number

	@IsOptional()
	@IsNumber({ allowInfinity: false, allowNaN: false })
	recentlyActive: number

	@IsOptional()
	@IsNumber({ allowInfinity: false, allowNaN: false })
	highPriority: number
}
