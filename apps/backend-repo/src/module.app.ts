import { Injectable, Module } from '~/helpers/helper.di'
import { Firebase } from '~/configs/config.firebase'
import { UserModule } from '~/modules/module.user'

@Module([
  {
    token: 'Firebase',
    useClass: Firebase,
  },
  {
    token: 'UserModule',
    useClass: UserModule,
  },
])
@Injectable()
export class AppModule {}
