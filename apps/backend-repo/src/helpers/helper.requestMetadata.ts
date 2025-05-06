import { Request } from 'express'
import { Injectable, Container } from '~/helpers//helper.di'

@Injectable()
export class RequestMetadata {
  req(): Request {
    return Container.resolve<Request>('Req')
  }
}
