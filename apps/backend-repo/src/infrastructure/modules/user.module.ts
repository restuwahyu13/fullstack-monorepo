import { UserMetadata, DependencyContainer, Injectable, Module } from 'pkg-monorepo'

import { UserService } from '~/infrastructure/services/user.service'
import { UserUsecase } from '~/usecases/user.usecase'
import { UserController } from '~/infrastructure/controllers/user.controller'
import { UserRoute } from '~/infrastructure/routes/user.route'
import { AuthMiddleware } from '~/infrastructure/common/middlewares/middleware.auth'
import { ValidatorMiddleware } from '~/infrastructure/common/middlewares/middleware.validator'

@Module([
  { token: 'UserService', useClass: UserService },
  { token: 'UserUsecase', useClass: UserUsecase },
  { token: 'UserController', useClass: UserController },
  {
    token: 'UserRoute',
    useFactory(dc: DependencyContainer) {
      return dc.resolve(UserRoute).main()
    },
  },
  {
    token: 'UserMetadata',
    useClass: UserMetadata,
  },
  {
    token: 'AuthMiddleware',
    useClass: AuthMiddleware,
  },
  {
    token: 'ValidatorMiddleware',
    useClass: ValidatorMiddleware,
  },
])
@Injectable()
export class UserModule {}
