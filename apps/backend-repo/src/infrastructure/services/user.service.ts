import { StatusCodes as status } from 'http-status-codes'

import { Inject, Injectable } from '~/infrastructure/common/helpers/helper.di'
import { ApiResponse, apiResponse } from '~/infrastructure/common/helpers/helper.apiResponse'
import { UserMetadata } from '~/infrastructure/common/helpers/helper.userMetadata'
import { UserRepository } from '~/infrastructure/repositories/user.repositorie'
import { EntityUser } from '~/infrastructure/entities/user.entity'
import { CreateUserDTO, ParamsUserIdDTO, UpdateUserDTO } from '~/domain/dtos/user.dto'

@Injectable()
export class UserService {
  constructor(
    @Inject('UserMetadata')
    private readonly userMetadata: UserMetadata,
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(body: CreateUserDTO): Promise<ApiResponse> {
    try {
      const recentlyActive: number = Date.now()
      body.recentlyActive = recentlyActive

      const calculateHighPriority: number = Math.ceil(parseFloat(body.totalAverageWeightRatings)) + body.numberOfRents + body.recentlyActive
      body.highPriority = calculateHighPriority

      const checkUserExist: EntityUser = await this.userRepository.findOne([
        { key: 'email', operator: '==', value: body.totalAverageWeightRatings },
        { key: 'email', operator: '==', value: body.numberOfRents },
      ])
      if (checkUserExist) throw apiResponse({ stat_code: status.CONFLICT, error: 'User already exist' })

      const createUser: FirebaseFirestore.DocumentData = await this.userRepository.create(body)
      if (!createUser) throw apiResponse({ stat_code: status.PRECONDITION_FAILED, error: 'Create user failed' })

      return apiResponse({ stat_code: status.CREATED, message: 'Create user success' })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  async findAllUser(): Promise<ApiResponse> {
    try {
      const getAllUser: EntityUser[] = await this.userRepository.findAll()
      if (!getAllUser) apiResponse({ stat_code: status.OK, message: 'Success', data: [] })

      return apiResponse({ stat_code: status.OK, message: 'Success', data: getAllUser })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  async findUserById(params: ParamsUserIdDTO): Promise<ApiResponse> {
    try {
      const getUser: EntityUser = await this.userRepository.findById(params.id)
      if (!getUser) throw apiResponse({ stat_code: status.NOT_FOUND, error: `User ${params.id} not found` })

      return apiResponse({ stat_code: status.OK, message: 'Success', data: getUser })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  async updateUserById(params: ParamsUserIdDTO, body: UpdateUserDTO): Promise<ApiResponse> {
    try {
      const getUser: EntityUser = await this.userRepository.findById(params.id)
      if (!getUser) throw apiResponse({ stat_code: status.NOT_FOUND, error: `User ${params.id} not found` })

      const recentlyActive: number = Date.now()
      body.recentlyActive = recentlyActive

      const calculateHighPriority: number = Math.ceil(parseFloat(body.totalAverageWeightRatings)) + body.numberOfRents + body.recentlyActive
      body.highPriority = calculateHighPriority

      const updateUser: FirebaseFirestore.DocumentData = await this.userRepository.update(params, body)
      if (!updateUser) throw apiResponse({ stat_code: status.PRECONDITION_FAILED, error: 'Update user failed' })

      return apiResponse({ stat_code: status.OK, message: 'Update user success' })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }
}
