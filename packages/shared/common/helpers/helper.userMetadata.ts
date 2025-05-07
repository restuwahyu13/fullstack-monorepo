import { Container, Injectable } from '~/common/helpers/helper.di'

@Injectable()
export class UserMetadata {
	user(): string {
		return Container.resolve<string>('User')
	}
}
