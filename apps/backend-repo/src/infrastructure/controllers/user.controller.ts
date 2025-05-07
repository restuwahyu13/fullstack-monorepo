import { NextFunction, Request, RequestHandler, Response } from 'express'
import { OutgoingMessage } from 'node:http'

import { ApiResponse, apiResponse } from '~/infrastructure/common/helpers/helper.apiResponse'
import { Inject, Injectable } from '~/infrastructure/common/helpers/helper.di'
import { rawParser } from '~/infrastructure/common/helpers/helper.rawParser'
import { UserUsecase } from '~/usecases/user.usecase'

@Injectable()
export class UserController {
  constructor(
    @Inject('UserUsecase')
    private readonly usecase: UserUsecase,
  ) {}

  createUser(): RequestHandler {
    return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const service: ApiResponse = await this.usecase.createUser(rawParser(req.body))
        return apiResponse(service, res)
      } catch (e: any) {
        return apiResponse(e, res)
      }
    }
  }

  findAllUser(): RequestHandler {
    return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const service: ApiResponse = await this.usecase.findAllUser(rawParser(req.query))
        return apiResponse(service, res)
      } catch (e: any) {
        return apiResponse(e, res)
      }
    }
  }

  findUserById(): RequestHandler {
    return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const service: ApiResponse = await this.usecase.findUserById(req.params as any)
        return apiResponse(service, res)
      } catch (e: any) {
        return apiResponse(e, res)
      }
    }
  }

  updateUserById(): RequestHandler {
    return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const service: ApiResponse = await this.usecase.updateUserById(req.params as any, rawParser(req.body))
        return apiResponse(service, res)
      } catch (e: any) {
        return apiResponse(e, res)
      }
    }
  }
}
