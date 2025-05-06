import { StatusCodes as status } from 'http-status-codes'

import { Inject, Injectable } from '~/helpers/helper.di'
import { ApiResponse, apiResponse } from '~/helpers/helper.apiResponse'
import { UserMetadata } from '~/helpers/helper.userMetadata'

@Injectable()
export class UserService {
  constructor(
    @Inject('UserMetadata')
    private readonly userMetadata: UserMetadata,
  ) {}

  async ping(): Promise<ApiResponse> {
    try {
      return apiResponse({ stat_code: status.OK, message: 'Success User' })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }
}
