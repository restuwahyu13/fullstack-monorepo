import { Inject, Route, Router } from '~/helpers/helper.di'
import { UserController } from '~/controllers/controller.user'

@Route()
export class UserRoute {
  private router: Router

  constructor(
    @Inject('UserController')
    private readonly controller: UserController,
  ) {
    this.router = Router({ strict: true, caseSensitive: true })
  }

  main(): Router {
    this.router.get('/', this.controller.ping())

    return this.router
  }
}
