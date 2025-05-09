import { EnvConfig } from './env.config'

export class BaseUrlConfig {
	static readonly RTR_AUTH_VERIFY_URL = `${EnvConfig.PUBLIC_API_URL}/auth/verify`
	static readonly AUTH_VERIFY_URL = `${EnvConfig.API_URL}/auth/verify`
}
