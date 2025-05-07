import { Injectable, Module } from '~/infrastructure/common/helpers/helper.di'
import { Firebase } from '~/infrastructure/common/configs/config.firebase'
import { UserModule } from '~/infrastructure/modules/user.module'

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
