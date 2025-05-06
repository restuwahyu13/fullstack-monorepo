import { config } from 'dotenv'

config({
  path: process.env.NODE_ENV === 'development' ? `.env.${process.env.NODE_ENV}` : `.env.${process.env.NODE_ENV}`,
  debug: process.env.NODE_ENV === 'development' ? true : false,
})

export class Environment {
  static readonly NODE_ENV: string = process.env.NODE_ENV
  static readonly SINGLE_THREAD: boolean = JSON.parse(process.env.SINGLE_THREAD || 'true')
  static readonly PORT: number = +process.env.PORT! || 3000
  static readonly REDIS_URL: string = process.env.REDIS_URL
  static readonly JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY
  static readonly JWT_EXPIRED: number = +process.env.JWT_EXPIRED || 3600
}
