import { VerifyAuthTokenDTO } from 'pkg-monorepo'

import { Inject, Injectable } from '~/infrastructure/common/helpers/helper.di'
import { AuthService } from '~/infrastructure/services/auth.service'
import { ApiResponse } from '~/infrastructure/common/helpers/helper.apiResponse'

@Injectable()
export class AuthUsecase {
  constructor(
    @Inject('AuthService')
    private readonly service: AuthService,
  ) {}

  verifyToken(): Promise<ApiResponse> {
    return this.service.verifyToken()
  }
}
