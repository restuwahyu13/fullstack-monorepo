import { CreateUserDTO, ApiResponse, QueryUserDTO, ParamsUserIdDTO, UpdateUserDTO, Injectable, Inject } from 'pkg-monorepo'

import { UserService } from '~/infrastructure/services/user.service'

@Injectable()
export class UserUsecase {
  constructor(
    @Inject('UserService')
    private readonly service: UserService,
  ) {}

  createUser(body: CreateUserDTO): Promise<ApiResponse> {
    return this.service.createUser(body)
  }

  findAllUser(query?: QueryUserDTO): Promise<ApiResponse> {
    return this.service.findAllUser(query)
  }

  findUserById(params: ParamsUserIdDTO): Promise<ApiResponse> {
    return this.service.findUserById(params)
  }

  updateUserById(params: ParamsUserIdDTO, body: UpdateUserDTO): Promise<ApiResponse> {
    return this.service.updateUserById(params, body)
  }
}
