import 'express-async-errors'
import 'reflect-metadata'
import { OutgoingMessage } from 'node:http'
import express, { Express, Request, Response, Router } from 'express'
import { StatusCodes as status } from 'http-status-codes'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import zlib from 'zlib'
import hpp from 'hpp'
import consola from 'consola'
import { apiResponse, GracefulShutdown, Injectable, Container } from 'pkg-monorepo'

import { AppModule } from '~/module.app'
import { Environment } from '~/infrastructure/common/configs/config.env'
import { Firebase } from './infrastructure/common/configs/config.firebase'

@Injectable()
class App {
  private app: Express
  private server: GracefulShutdown
  private version: string

  constructor() {
    this.app = express()
    this.server = new GracefulShutdown(Environment.NODE_ENV, Environment.PORT, Environment.SINGLE_THREAD)
    this.version = '/api/v1'
  }

  private config(): void {
    this.app.enable('trust proxy')
    this.app.disable('x-powered-by')
    Container.resolve<AppModule>(AppModule)
  }

  private connection(): void {
    const datasource: Firebase = Container.resolve('Firebase')
    Container.registerInstance('FirebaseConnection', datasource)
  }

  private middleware(): void {
    this.app.use(express.json({ limit: '3mb' }))
    this.app.use(express.raw({ inflate: true, limit: '3mb', type: 'application/json' }))
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(helmet({ contentSecurityPolicy: false }))
    this.app.use(hpp({ checkBody: true, checkQuery: true }))
    this.app.use(
      cors({
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
        allowedHeaders: ['Accept', 'Authorization', 'Content-Type'],
        credentials: true,
      }),
    )
    this.app.use(
      compression({
        strategy: zlib.constants.Z_RLE,
        level: zlib.constants.Z_BEST_COMPRESSION,
        memLevel: zlib.constants.Z_BEST_COMPRESSION,
      }),
    )
    if (!['production', 'staging'].includes(Environment.NODE_ENV)) {
      this.app.use(morgan('dev'))
    }
  }

  private route(): void {
    this.app.use(`${this.version}/user`, Container.resolve<Router>('UserRoute'))
  }

  private globalRoute(): void {
    this.app.all('/', (_req: Request, res: Response): OutgoingMessage => {
      return apiResponse<OutgoingMessage>({ stat_code: status.OK, message: 'Ping!' }, res)
    })

    this.app.use((req: Request, res: Response): OutgoingMessage => {
      const metadata: Record<string, any> = {
        host: req.hostname,
        path: req.path,
        method: req.method,
        ip: req.header('x-real-ip') ?? req.header('x-forwarded-for') ?? req.ip ?? req.socket.remoteAddress,
      }

      return apiResponse<OutgoingMessage>({ stat_code: status.NOT_FOUND, message: 'Route not found!', data: metadata }, res)
    })
  }

  private eventSignal(): void {
    if (!Environment.NODE_ENV) {
      consola.warn('Please set node environment to local or staging or production')
      process.exit(0)
    }

    process
      .on('uncaughtException', (e) => {
        consola.error('Interrupt indicate uncaughtException\n\n', JSON.stringify(e))
      })
      .on('unhandledRejection', (e) => {
        consola.error('Interrupt indicate unhandledRejection process\n\n', JSON.stringify(e))
      })
      .on('uncaughtExceptionMonitor', (e) => {
        consola.error('Interrupt indicate uncaughtExceptionMonitor process\n\n', JSON.stringify(e))
      })
      .on('rejectionHandled', (e) => {
        consola.error('Interrupt indicate rejectionHandled process\n\n', JSON.stringify(e))
      })
  }

  public async main(): Promise<void> {
    try {
      this.config()
      this.connection()
      this.middleware()
      this.route()
      this.globalRoute()
      this.eventSignal()
      this.server.listen(this.app)
    } catch (e) {
      consola.error(e)
    }
  }
}

/**
 * @description boostraping app and run app with env development / production or staging
 */

;(function () {
  if (Environment.NODE_ENV !== 'test') Container.resolve<App>(App).main()
})()
