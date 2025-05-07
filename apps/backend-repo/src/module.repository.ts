import { Injectable, Module } from 'pkg-monorepo'
import { UserRepository } from '~/infrastructure/repositories/user.repositorie'

@Module([
  {
    token: 'UserRepository',
    useClass: UserRepository,
  },
])
@Injectable()
export class RepositoryModule {}
