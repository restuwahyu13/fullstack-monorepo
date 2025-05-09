import { NextFunction, Request, Response } from 'express'
import { OutgoingMessage } from 'node:http'
import { StatusCodes as status } from 'http-status-codes'
import { DecodedIdToken } from 'firebase-admin/auth'
import { isJWT } from 'class-validator'
import { logger } from 'pkg-monorepo'

import { Inject, Injectable } from '~/infrastructure/common/helpers/helper.di'
import { apiResponse } from '~/infrastructure/common/helpers/helper.apiResponse'
import { UserRepository } from '~/infrastructure/repositories/user.repositorie'

@Injectable()
export class AuthMiddleware {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  use(): (req: Request, res: Response, next: NextFunction) => Promise<OutgoingMessage> {
    const userRepository: UserRepository = this.userRepository

    return async (req: Request, res: Response, next: NextFunction): Promise<OutgoingMessage> => {
      try {
        const headers: Record<string, any> = req.headers

        if (!headers.hasOwnProperty('authorization')) {
          throw apiResponse({ stat_code: status.UNAUTHORIZED, error: 'Authorization required' })
        } else if (!Array.isArray(headers.authorization.match('Bearer'))) {
          throw apiResponse({ stat_code: status.UNAUTHORIZED, error: 'Unauthorized invalid token' })
        }

        let authToken: string = headers.authorization.split('Bearer ')[1]
        if (!isJWT(authToken)) {
          throw apiResponse({ stat_code: status.UNAUTHORIZED, error: 'Unauthorized invalid token' })
        }

        const verifyRes: DecodedIdToken = await userRepository.verifiedToken(authToken)
        if (!verifyRes) {
          throw apiResponse({ stat_code: status.UNAUTHORIZED, error: 'Unauthorized invalid token' })
        }

        next()
      } catch (e: any) {
        logger(e, 'error')
        return apiResponse({ stat_code: status.UNAUTHORIZED, error: 'Unauthorized invalid token' }, res)
      }
    }
  }
}
