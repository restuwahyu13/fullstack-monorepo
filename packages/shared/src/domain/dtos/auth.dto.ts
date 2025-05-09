import { IsJWT, IsOptional } from 'class-validator'

export class VerifyAuthTokenDTO {
	@IsOptional()
	@IsJWT()
	accessToken: string

	@IsOptional()
	@IsJWT()
	refreshToken?: string
}
