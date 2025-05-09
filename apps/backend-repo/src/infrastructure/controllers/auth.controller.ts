import { NextFunction, Request, RequestHandler, Response } from 'express'
import { OutgoingMessage } from 'node:http'

import { Inject, Injectable } from '~/infrastructure/common/helpers/helper.di'
import { AuthUsecase } from '~/usecases/auth.usecase'
import { ApiResponse, apiResponse } from '~/infrastructure/common/helpers/helper.apiResponse'
import { rawParser } from '~/infrastructure/common/helpers/helper.rawParser'

@Injectable()
export class AuthController {
  constructor(
    @Inject('AuthUsecase')
    private readonly usecase: AuthUsecase,
  ) {}

  verifyToken(): RequestHandler {
    return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const service: ApiResponse = await this.usecase.verifyToken(rawParser(req.body))
        return apiResponse(service, res)
      } catch (e: any) {
        return apiResponse(e, res)
      }
    }
  }
}
