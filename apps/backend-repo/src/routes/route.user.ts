import { Inject, Route, Router } from '~/helpers/helper.di'
import { UserController } from '~/controllers/controller.user'
import { ValidatorMiddleware } from '~/middlewares/middleware.validator'
import { CreateUserDTO, ParamsUserIdDTO, UpdateUserDTO } from '~/dtos/dto.user'

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
    this.router.get('/:id', [this.validator.use(ParamsUserIdDTO)], this.controller.findById())
    this.router.put('/', [this.validator.use(UpdateUserDTO)], this.controller.updateById())

    return this.router
  }
}
