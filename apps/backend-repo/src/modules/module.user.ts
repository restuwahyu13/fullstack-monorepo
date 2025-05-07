import { DependencyContainer } from 'tsyringe'
import { Injectable, Module } from '~/helpers/helper.di'

import { UserService } from '~/services/service.user'
import { UserController } from '~/controllers/controller.user'
import { UserRoute } from '~/routes/route.user'
import { UserRepository } from '~/repositories/repository.user'
import { UserMetadata } from '~/helpers/helper.userMetadata'
import { ValidatorMiddleware } from '~/middlewares/middleware.validator'

@Module([
  { token: 'UserService', useClass: UserService },
  { token: 'UserController', useClass: UserController },
  {
    token: 'UserRoute',
    useFactory(dc: DependencyContainer) {
      return dc.resolve(UserRoute).main()
    },
  },
  {
    token: 'UserRepository',
    useClass: UserRepository,
  },
  {
    token: 'UserMetadata',
    useClass: UserMetadata,
  },
  {
    token: 'ValidatorMiddleware',
    useClass: ValidatorMiddleware,
  },
])
@Injectable()
export class UserModule {}
