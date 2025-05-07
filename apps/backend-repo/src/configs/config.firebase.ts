import firebase from 'firebase-admin'

import { Environment } from '~/configs/config.env'
import { Injectable } from '~/helpers/helper.di'

@Injectable()
export class Firebase {
  private app: firebase.app.App

  constructor() {
    this.app = firebase.initializeApp({
      projectId: Environment.FIREBASE_CERT_PROJECT_ID,
      credential: firebase.credential.cert({
        projectId: Environment.FIREBASE_CERT_PROJECT_ID,
        privateKey: `-----BEGIN PRIVATE KEY-----${Environment.FIREBASE_CERT_PRIVATE_KEY.replace(/\\n/g, '\n')}-----END PRIVATE KEY-----\n`,
        clientEmail: Environment.FIREBASE_CERT_CLIENT_EMAIL,
      }),
    })
  }

  firestore(): FirebaseFirestore.Firestore {
    const firestore: FirebaseFirestore.Firestore = this.app.firestore()

    if (Environment.NODE_ENV === 'development') {
      firestore.settings({ host: Environment.FIREBASE_AUTH_EMULATOR_HOST, ssl: false })
    }

    return firestore
  }

  auth(): firebase.auth.Auth {
    return this.app.auth()
  }
}
