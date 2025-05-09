import { EnvConfig } from './env.config'

export class BaseUrlConfig {
	static readonly RTR_LOGIN_URL = `${EnvConfig.PUBLIC_API_URL}/login`
	static readonly AUTH_VERIFY_URL = `${EnvConfig.API_URL}/auth/verify`
}
