import { DependencyContainer } from 'tsyringe'
import { Injectable, Module } from '~/helpers/helper.di'

import { UserService } from '~/services/service.user'
import { UserController } from '~/controllers/controller.user'
import { UserRoute } from '~/routes/route.user'
import { UserMetadata } from '~/helpers/helper.userMetadata'

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
    token: 'UserMetadata',
    useClass: UserMetadata,
  },
])
@Injectable()
export class UserModule {}
