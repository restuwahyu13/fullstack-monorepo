import { StatusCodes as status } from 'http-status-codes'
import { VerifyAuthTokenDTO } from 'pkg-monorepo'

import { Inject, Injectable } from '~/infrastructure/common/helpers/helper.di'
import { UserRepository } from '~/infrastructure/repositories/user.repositorie'
import { ApiResponse, apiResponse } from '~/infrastructure/common/helpers/helper.apiResponse'

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async verifyToken(body: VerifyAuthTokenDTO): Promise<ApiResponse> {
    try {
      let isValidToken: boolean = false

      if (body?.accessToken && !this.userRepository.verifiedToken(body.accessToken)) isValidToken = true
      if (body?.refreshToken && !this.userRepository.verifiedToken(body.refreshToken)) isValidToken = true

      if (!isValidToken) throw apiResponse({ stat_code: status.UNAUTHORIZED, error: 'Invalid accessToken or refreshToken' })

      return apiResponse({ stat_code: status.OK, message: 'Token is verified' })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }
}
