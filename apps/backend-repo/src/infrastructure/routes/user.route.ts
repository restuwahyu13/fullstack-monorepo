import { Inject, Route, Router } from '~/infrastructure/common/helpers/helper.di'
import { UserController } from '~/infrastructure/controllers/user.controller'
import { ValidatorMiddleware } from '~/infrastructure/common/middlewares/middleware.validator'
import { CreateUserDTO, ParamsUserIdDTO, UpdateUserDTO } from '~/domain/dtos/user.dto'

@Route()
export class UserRoute {
  private router: Router

  constructor(
    @Inject('UserController')
    private readonly controller: UserController,
    @Inject('ValidatorMiddleware')
    private readonly validator: ValidatorMiddleware,
  ) {
    this.router = Router({ strict: true, caseSensitive: true })
  }

  main(): Router {
    this.router.post('/', [this.validator.use(CreateUserDTO)], this.controller.createUser())
    this.router.get('/', this.controller.findAllUser())
    this.router.get('/:id', [this.validator.use(ParamsUserIdDTO)], this.controller.findUserById())
    this.router.put('/:id', [this.validator.use(UpdateUserDTO)], this.controller.updateUserById())

    return this.router
  }
}
