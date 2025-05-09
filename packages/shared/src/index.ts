/**
 * Helper Shared - Teritory
 */

export { ApplicationError } from '~/common/helpers/helper.error'
export { logger } from '~/common/helpers/helper.logger'
export { authBearer, xRequestToken } from '~/common/helpers/helper.customHeader'

/**
 * Interface Libs - Teritory
 */

export { HttpClient } from '~/common/libs/axios.lib'
export { Cookie } from '~/common/libs/cookie.lib'

/**
 * DTO Shared - Teritory
 */

export { CommonFilterQueryDTO } from '~/domain/dtos/common.dto'
export { CreateUserDTO, ParamsUserIdDTO, QueryUserDTO, UpdateUserDTO } from '~/domain/dtos/user.dto'
export { VerifyAuthTokenDTO } from '~/domain/dtos/auth.dto'

/**
 * Enum Shared - Teritory
 */

export { ESortQuery } from '~/domain/enums/common.enum'
export { HttpClientAdapterType, HttpClientMethod, HttpClientType } from '~/domain/enums/axios.enum'

/**
 * Interface Shared - Teritory
 */

export { IUser } from '~/domain/interfaces/user.interface'
export { HttpClientInterceptor, HttpClientRequestOptions, HttpClientResponse } from '~/domain/interfaces/axios.interface'
