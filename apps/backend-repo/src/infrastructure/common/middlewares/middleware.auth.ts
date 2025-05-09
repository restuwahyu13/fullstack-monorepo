import { NextFunction, Request, Response } from 'express'
import { OutgoingMessage } from 'node:http'
import { StatusCodes as status } from 'http-status-codes'
import { DecodedIdToken } from 'firebase-admin/auth'
import { isJWT } from 'class-validator'

import { Injectable } from '~/infrastructure/common/helpers/helper.di'
import { Firebase } from '~/infrastructure/common/configs/config.firebase'
import { apiResponse } from '~/infrastructure/common/helpers/helper.apiResponse'

@Injectable()
export class AuthMiddleware {
  constructor() {}

  async use(req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> {
    try {
      const firebase: Firebase = new Firebase()
      const headers: Record<string, any> = req.headers

      if (!headers.hasOwnProperty('authorization')) {
        throw apiResponse({ stat_code: status.UNAUTHORIZED, error: 'Authorization required' })
      } else if (!Array.isArray(headers.authorization.match('Bearer'))) {
        throw apiResponse({ stat_code: status.UNAUTHORIZED, error: 'Unauthorized invalid token' })
      }

      let authToken: string = headers.authorization.split('Bearer ')[1]
      if (isJWT(authToken)) {
        throw apiResponse({ stat_code: status.UNAUTHORIZED, error: 'Unauthorized invalid token' })
      }

      const verifyRes: DecodedIdToken = await firebase.auth().verifyIdToken(authToken)
      if (!verifyRes) {
        throw apiResponse({ stat_code: status.UNAUTHORIZED, error: 'Unauthorized invalid token' })
      }

      next()
    } catch (e: any) {
      return apiResponse({ stat_code: status.UNAUTHORIZED, error: 'Unauthorized invalid token' }, res)
    }
  }
}
