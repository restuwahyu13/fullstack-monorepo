export class EnvConfig {
	static readonly NODE_ENV = process.env.NEXT_NODE_ENV
	static readonly API_URL = process.env.API_URL
	static readonly PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL
	static readonly API_KEY = process.env.NEXT_PUBLIC_API_KEY
	static readonly AUTH_DOMAIN = process.env.NEXT_AUTH_DOMAIN
	static readonly DATABASE_URL = process.env.NEXT_DATABASE_URL
	static readonly PROJECT_ID = process.env.NEXT_PROJECT_ID
	static readonly STORAGE_BUCKET = process.env.NEXT_STORAGE_BUCKET
	static readonly MESSAGING_SENDER_ID = process.env.NEXT_MESSAGING_SENDER_ID
	static readonly APP_ID = process.env.NEXT_APP_ID
	static readonly MEASUREMENT_ID = process.env.NEXT_MEASUREMENT_ID
}
