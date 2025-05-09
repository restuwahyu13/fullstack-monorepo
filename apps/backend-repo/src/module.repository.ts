import { Injectable, Module } from '~/infrastructure/common/helpers/helper.di'
import { UserRepository } from '~/infrastructure/repositories/user.repositorie'

@Module([
  {
    token: 'UserRepository',
    useClass: UserRepository,
  },
])
@Injectable()
export class RepositoryModule {}
