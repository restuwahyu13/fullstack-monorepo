import { FirebaseOptions, FirebaseServerAppSettings, getApps, initializeApp, initializeServerApp } from 'firebase/app'
import { Auth, getAuth } from 'firebase/auth'

import { EFirebaseType } from '~/domains/constants/firebase.constant'
import { EnvConfig } from '~/infrastructure/common/configs/env.config'

export class FirebaseConfig {
	private static config(): { client: FirebaseOptions; server: FirebaseServerAppSettings } {
		return {
			client: {
				apiKey: EnvConfig.API_KEY,
				authDomain: EnvConfig.AUTH_DOMAIN,
				projectId: EnvConfig.PROJECT_ID,
				storageBucket: EnvConfig.STORAGE_BUCKET,
				messagingSenderId: EnvConfig.MESSAGING_SENDER_ID,
				appId: EnvConfig.APP_ID
			},
			server: {
				authIdToken: '',
				appCheckToken: ''
			}
		}
	}

	private static app(type: EFirebaseType) {
		const config: { client: FirebaseOptions; server: FirebaseServerAppSettings } = FirebaseConfig.config()

		if (!getApps().length) return type === EFirebaseType.CLIENT ? initializeApp(config.client) : initializeServerApp(config.client, config.server)
		return getApps()[0]
	}

	static auth(type: EFirebaseType): Auth {
		return getAuth(FirebaseConfig.app(type))
	}
}
