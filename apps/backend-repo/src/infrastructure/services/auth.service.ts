import { StatusCodes as status } from 'http-status-codes'

import { Injectable } from '~/infrastructure/common/helpers/helper.di'
import { ApiResponse, apiResponse } from '~/infrastructure/common/helpers/helper.apiResponse'

@Injectable()
export class AuthService {
  async verifyToken(): Promise<ApiResponse> {
    try {
      return apiResponse({ stat_code: status.OK, message: 'Token is verified' })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }
}
