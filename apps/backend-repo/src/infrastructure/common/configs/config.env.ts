import { config } from 'dotenv'

config({
  path: process.env.NODE_ENV === 'development' ? `.env.${process.env.NODE_ENV}` : `.env.${process.env.NODE_ENV}`,
  debug: process.env.NODE_ENV === 'development' ? true : false,
})

export class Environment {
  static readonly NODE_ENV: string = process.env.NODE_ENV
  static readonly SINGLE_THREAD: boolean = process.env.SINGLE_THREAD === 'true' ? true : false
  static readonly PORT: number = +process.env.PORT! || 3000
  static readonly REDIS_URL: string = process.env.REDIS_URL
  static readonly JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY
  static readonly JWT_EXPIRED: number = +process.env.JWT_EXPIRED || 3600
  static readonly FIREBASE_CERT_TYPE: string = process.env.FIREBASE_CERT_TYPE
  static readonly FIREBASE_CERT_PROJECT_ID = process.env.FIREBASE_CERT_PROJECT_ID
  static readonly FIREBASE_CERT_PRIVATE_KEY_ID = process.env.FIREBASE_CERT_PRIVATE_KEY_ID
  static readonly FIREBASE_CERT_PRIVATE_KEY = process.env.FIREBASE_CERT_PRIVATE_KEY?.replace(/\\n/g, '\n')
  static readonly FIREBASE_CERT_CLIENT_EMAIL = process.env.FIREBASE_CERT_CLIENT_EMAIL
  static readonly FIREBASE_CERT_CLIENT_ID = process.env.FIREBASE_CERT_CLIENT_ID
  static readonly FIREBASE_CERT_AUTH_URI = process.env.FIREBASE_CERT_AUTH_URI
  static readonly FIREBASE_CERT_TOKEN_URI = process.env.FIREBASE_CERT_TOKEN_URI
  static readonly FIREBASE_CERT_AUTH_PROVIDER_X509_CERT_URL = process.env.FIREBASE_CERT_AUTH_PROVIDER_X509_CERT_URL
  static readonly FIREBASE_CERT_CLIENT_X509_CERT_URL = process.env.FIREBASE_CERT_CLIENT_X509_CERT_URL
  static readonly FIREBASE_CERT_UNIVERSE_DOMAIN = process.env.FIREBASE_CERT_UNIVERSE_DOMAIN
  static readonly FIREBASE_DB_URL = process.env.FIREBASE_DB_URL
  static readonly FIREBASE_AUTH_EMULATOR_HOST = process.env.FIREBASE_AUTH_EMULATOR_HOST
  static readonly FIREBASE_FIRESTORE_EMULATOR_HOST = process.env.FIREBASE_FIRESTORE_EMULATOR_HOST
}
