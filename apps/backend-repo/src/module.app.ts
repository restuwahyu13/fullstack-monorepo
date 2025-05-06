import { Injectable, Module } from '~/helpers/helper.di'
import { UserModule } from '~/modules/module.user'

@Module([
  {
    token: 'UserModule',
    useClass: UserModule,
  },
])
@Injectable()
export class AppModule {}
