import { StatusCodes as status } from 'http-status-codes'
import { isJSON } from 'class-validator'

import { Inject, Injectable } from '~/infrastructure/common/helpers/helper.di'
import { ApiResponse, apiResponse } from '~/infrastructure/common/helpers/helper.apiResponse'
import { UserRepository } from '~/infrastructure/repositories/user.repositorie'
import { EntityUser } from '~/infrastructure/entities/user.entity'
import { CreateUserDTO, ParamsUserIdDTO, QueryUserDTO, UpdateUserDTO } from '~/domain/dtos/user.dto'
import { ESortQuery } from '~/domain/enums/common.enum'

@Injectable()
export class UserService {
  constructor(
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

  async findAllUser(query?: QueryUserDTO): Promise<ApiResponse> {
    try {
      query.page = Number(query?.page ?? 1)
      query.limit = Number(query?.limit ?? 10)
      query.sort = query?.sort ?? ESortQuery.ASC

      if (query?.filter) {
        if (!isJSON(query?.filter)) throw apiResponse({ stat_code: status.UNPROCESSABLE_ENTITY, error: 'Invalid filter must be a json format' })
        query.filter = JSON.parse(query.filter || '')
      }

      if (query.limit > 1000) query.limit = 1000
      query.page = query.limit * (query.page - 1)

      const getAllUser: EntityUser[] = await this.userRepository.findAll(query)
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
