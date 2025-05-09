import { EnvConfig } from './env.config'

export class BaseUrlConfig {
	static readonly RTR_AUTH_VERIFY_URL = `${EnvConfig.PUBLIC_API_URL}/auth/verify`
	static readonly RTR_USER_LIST_URL = `${EnvConfig.PUBLIC_API_URL}/users/list`

	static readonly AUTH_VERIFY_URL = `${EnvConfig.API_URL}/auth/verify`
	static readonly USER_URL = `${EnvConfig.API_URL}/user`
}
