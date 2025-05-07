import { Request } from 'express'
import { Injectable, Container } from '~/infrastructure/common/helpers/helper.di'

@Injectable()
export class RequestMetadata {
  req(): Request {
    return Container.resolve<Request>('Req')
  }
}
