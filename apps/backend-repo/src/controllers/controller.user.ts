import { NextFunction, Request, RequestHandler, Response } from 'express'
import { OutgoingMessage } from 'node:http'

import { ApiResponse, apiResponse } from '~/helpers/helper.apiResponse'
import { Inject, Injectable } from '~/helpers/helper.di'
import { rawParser } from '~/helpers/helper.rawParser'
import { UserService } from '~/services/service.user'

@Injectable()
export class UserController {
  constructor(
    @Inject('UserService')
    private readonly service: UserService,
  ) {}

  createUser(): RequestHandler {
    return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const service: ApiResponse = await this.service.createUser(rawParser(req.body))
        return apiResponse(service, res)
      } catch (e: any) {
        return apiResponse(e, res)
      }
    }
  }

  findAllUser(): RequestHandler {
    return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const service: ApiResponse = await this.service.findAllUser()
        return apiResponse(service, res)
      } catch (e: any) {
        return apiResponse(e, res)
      }
    }
  }

  findById(): RequestHandler {
    return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const service: ApiResponse = await this.service.findById(req.params as any)
        return apiResponse(service, res)
      } catch (e: any) {
        return apiResponse(e, res)
      }
    }
  }

  updateById(): RequestHandler {
    return async (req: Request, res: Response, _next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const service: ApiResponse = await this.service.updateById(req.params as any, rawParser(req.body))
        return apiResponse(service, res)
      } catch (e: any) {
        return apiResponse(e, res)
      }
    }
  }
}
