import { EnvConfig } from './env.config'

export class BaseUrlConfig {
	static readonly RTR_LOGIN_URL = `${EnvConfig.PUBLIC_API_URL}/login`
}
