import { NextFunction, Request, RequestHandler, Response } from 'express'
import { OutgoingMessage } from 'node:http'

import { ApiResponse, apiResponse } from '~/helpers/helper.apiResponse'
import { Inject, Injectable } from '~/helpers/helper.di'
import { UserService } from '~/services/service.user'

@Injectable()
export class UserController {
  constructor(
    @Inject('UserService')
    private readonly service: UserService,
  ) {}

  ping(): RequestHandler {
    return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const service: ApiResponse = await this.service.ping()
        return apiResponse(service, res)
      } catch (e: any) {
        return apiResponse(e, res)
      }
    }
  }
}
