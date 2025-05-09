import { DependencyContainer, Injectable, Module } from '~/infrastructure/common/helpers/helper.di'

import { AuthUsecase } from '~/usecases/auth.usecase'
import { AuthController } from '~/infrastructure/controllers/auth.controller'
import { AuthService } from '~/infrastructure/services/auth.service'
import { ValidatorMiddleware } from '~/infrastructure/common/middlewares/middleware.validator'
import { AuthRoute } from '~/infrastructure/routes/auth.route'

@Module([
  { token: 'AuthService', useClass: AuthService },
  { token: 'AuthUsecase', useClass: AuthUsecase },
  { token: 'AuthController', useClass: AuthController },
  {
    token: 'AuthRoute',
    useFactory(dc: DependencyContainer) {
      return dc.resolve(AuthRoute).main()
    },
  },
  {
    token: 'ValidatorMiddleware',
    useClass: ValidatorMiddleware,
  },
])
@Injectable()
export class AuthModule {}
