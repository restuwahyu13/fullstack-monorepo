import { IsBase64, IsDecimal, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export class ParamsUserIdDTO {
  @IsNotEmpty()
  @IsBase64()
  id: string
}

export class CreateUserDTO {
  @IsDecimal({ force_decimal: true })
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
  @IsDecimal({ force_decimal: true })
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
