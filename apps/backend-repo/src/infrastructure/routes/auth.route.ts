import { Inject, Route, Router } from '~/infrastructure/common/helpers/helper.di'
import { AuthController } from '~/infrastructure/controllers/auth.controller'
import { AuthMiddleware } from '~/infrastructure/common/middlewares/middleware.auth'

@Route()
export class AuthRoute {
  private router: Router

  constructor(
    @Inject('AuthController')
    private readonly controller: AuthController,
    @Inject('AuthMiddleware')
    private readonly auth: AuthMiddleware,
  ) {
    this.router = Router({ strict: true, caseSensitive: true })
  }

  main(): Router {
    this.router.get('/verify', this.auth.use(), this.controller.verifyToken())

    return this.router
  }
}
