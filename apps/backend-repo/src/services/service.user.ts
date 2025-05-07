import { StatusCodes as status } from 'http-status-codes'
import { FirebaseAuthError, UserRecord } from 'firebase-admin/auth'

import { Inject, Injectable } from '~/helpers/helper.di'
import { ApiResponse, apiResponse } from '~/helpers/helper.apiResponse'
import { UserMetadata } from '~/helpers/helper.userMetadata'
import { UserRepository } from '~/repositories/repository.user'
import { CreateUserDTO, ParamsUserIdDTO, UpdateUserDTO } from '~/dtos/dto.user'

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

      const createUser: FirebaseFirestore.DocumentData = await this.userRepository.create(body)
      if (!createUser) throw apiResponse({ stat_code: status.PRECONDITION_FAILED, error: 'Create user failed' })

      return apiResponse({ stat_code: status.CREATED, message: 'Create user success', data: createUser })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  async findAllUser(): Promise<ApiResponse> {
    try {
      const getAllUser: FirebaseFirestore.DocumentData = await this.userRepository.findAll()
      return apiResponse({ stat_code: status.OK, message: 'Success', data: getAllUser })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  async findById(params: ParamsUserIdDTO): Promise<ApiResponse> {
    try {
      const getUser: FirebaseFirestore.DocumentData = await this.userRepository.findById(params.id)
      if (!getUser) throw apiResponse({ stat_code: status.NOT_FOUND, error: `User ${params.id} not found` })

      return apiResponse({ stat_code: status.OK, message: 'Success', data: getUser })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }

  async updateById(params: ParamsUserIdDTO, body: UpdateUserDTO): Promise<ApiResponse> {
    try {
      const getUser: FirebaseFirestore.DocumentData = await this.userRepository.findById(params.id)
      if (!getUser) throw apiResponse({ stat_code: status.NOT_FOUND, error: `User ${params.id} not found` })

      const updateUser: FirebaseFirestore.DocumentData = await this.userRepository.update(params, body)
      if (!updateUser) throw apiResponse({ stat_code: status.PRECONDITION_FAILED, error: 'Update user failed' })

      return apiResponse({ stat_code: status.OK, message: 'Update user success' })
    } catch (e: any) {
      throw apiResponse(e)
    }
  }
}
