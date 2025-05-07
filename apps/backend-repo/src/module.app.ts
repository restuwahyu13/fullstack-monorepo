import { Injectable, Module } from 'pkg-monorepo'
import { Firebase } from '~/infrastructure/common/configs/config.firebase'
import { RepositoryModule } from '~/module.repository'
import { UserModule } from '~/infrastructure/modules/user.module'

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
])
@Injectable()
export class AppModule {}
