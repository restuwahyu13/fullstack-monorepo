import { Inject, Injectable } from '~/infrastructure/common/helpers/helper.di'
import { ApiResponse } from '~/infrastructure/common/helpers/helper.apiResponse'
import { UserService } from '~/infrastructure/services/user.service'
import { CreateUserDTO, ParamsUserIdDTO, QueryUserDTO, UpdateUserDTO } from '~/domain/dtos/user.dto'

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
