import { VerifyAuthTokenDTO } from 'pkg-monorepo'

import { Inject, Route, Router } from '~/infrastructure/common/helpers/helper.di'
import { ValidatorMiddleware } from '~/infrastructure/common/middlewares/middleware.validator'
import { AuthController } from '~/infrastructure/controllers/auth.controller'

@Route()
export class AuthRoute {
  private router: Router

  constructor(
    @Inject('AuthController')
    private readonly controller: AuthController,
    @Inject('ValidatorMiddleware')
    private readonly validator: ValidatorMiddleware,
  ) {
    this.router = Router({ strict: true, caseSensitive: true })
  }

  main(): Router {
    this.router.post('/verify', [this.validator.use(VerifyAuthTokenDTO)], this.controller.verifyToken())

    return this.router
  }
}
