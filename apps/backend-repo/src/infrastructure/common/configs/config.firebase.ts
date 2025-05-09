import firebase from 'firebase-admin'
import { Auth } from 'firebase-admin/auth'
import { Firestore } from 'firebase-admin/firestore'

import { Injectable } from '~/infrastructure/common/helpers/helper.di'
import firebaseConfig from '~/infrastructure/common/configs/firebase.json'
import { Environment } from '~/infrastructure/common/configs/config.env'

@Injectable()
export class Firebase {
  private app: firebase.app.App
  private _firestore: Firestore | null = null

  constructor() {
    this.app = firebase.initializeApp({
      projectId: Environment.FIREBASE_CERT_PROJECT_ID,
      databaseURL: Environment.FIREBASE_DB_URL,
      credential: firebase.credential.cert(firebaseConfig as any),
    })
  }

  firestore(): Firestore {
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

  auth(): Auth {
    return this.app.auth()
  }
}
