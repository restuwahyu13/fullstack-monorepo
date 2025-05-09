import { DependencyContainer, Injectable, Module } from '~/infrastructure/common/helpers/helper.di'

import { AuthUsecase } from '~/usecases/auth.usecase'
import { AuthController } from '~/infrastructure/controllers/auth.controller'
import { AuthService } from '~/infrastructure/services/auth.service'
import { AuthRoute } from '~/infrastructure/routes/auth.route'
import { AuthMiddleware } from '~/infrastructure/common/middlewares/middleware.auth'

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
    token: 'AuthMiddleware',
    useClass: AuthMiddleware,
  },
])
@Injectable()
export class AuthModule {}
