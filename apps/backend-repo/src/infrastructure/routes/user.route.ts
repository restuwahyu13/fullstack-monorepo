import { CreateUserDTO, ParamsUserIdDTO, UpdateUserDTO, Route, Inject, Router } from 'pkg-monorepo'

import { UserController } from '~/infrastructure/controllers/user.controller'
import { ValidatorMiddleware } from '~/infrastructure/common/middlewares/middleware.validator'
import { AuthMiddleware } from '~/infrastructure/common/middlewares/middleware.auth'

@Route()
export class UserRoute {
  private router: Router

  constructor(
    @Inject('UserController')
    private readonly controller: UserController,
    @Inject('AuthMiddleware')
    private readonly auth: AuthMiddleware,
    @Inject('ValidatorMiddleware')
    private readonly validator: ValidatorMiddleware,
  ) {
    this.router = Router({ strict: true, caseSensitive: true })
  }

  main(): Router {
    this.router.post('/', [this.auth.use, this.validator.use(CreateUserDTO)], this.controller.createUser())
    this.router.get('/', [this.auth.use], this.controller.findAllUser())
    this.router.get('/:id', [this.auth.use, this.validator.use(ParamsUserIdDTO)], this.controller.findUserById())
    this.router.put('/:id', [this.auth.use, this.validator.use(UpdateUserDTO)], this.controller.updateUserById())

    return this.router
  }
}
