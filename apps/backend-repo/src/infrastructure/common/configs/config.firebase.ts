import firebase from 'firebase-admin'
import { Injectable } from 'pkg-monorepo'

import { Environment } from '~/infrastructure/common/configs/config.env'

@Injectable()
export class Firebase {
  private app: firebase.app.App
  private _firestore: FirebaseFirestore.Firestore | null = null

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
    if (this._firestore) return this._firestore

    const firestore = this.app.firestore()

    if (Environment.FIREBASE_FIRESTORE_EMULATOR_HOST) {
      firestore.settings({
        host: Environment.FIREBASE_FIRESTORE_EMULATOR_HOST,
        ssl: false,
        ignoreUndefinedProperties: true,
      })
    }

    this._firestore = firestore
    return firestore
  }

  auth(): firebase.auth.Auth {
    return this.app.auth()
  }
}
