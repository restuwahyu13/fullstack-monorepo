import { Injectable, Module } from '~/infrastructure/common/helpers/helper.di'
import { Firebase } from '~/infrastructure/common/configs/config.firebase'
import { RepositoryModule } from '~/module.repository'
import { UserModule } from '~/infrastructure/modules/user.module'
import { AuthModule } from '~/infrastructure/modules/auth.module'

@Module([
  {
    token: 'Firebase',
    useClass: Firebase,
  },
  {
    token: 'RepositoryModule',
    useClass: RepositoryModule,
  },
  {
    token: 'UserModule',
    useClass: UserModule,
  },
  {
    token: 'AuthModule',
    useClass: AuthModule,
  },
])
@Injectable()
export class AppModule {}
