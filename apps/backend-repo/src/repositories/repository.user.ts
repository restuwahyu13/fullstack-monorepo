import { app } from 'firebase-admin'
import { DecodedIdToken, UserRecord } from 'firebase-admin/auth'
import { DocumentData } from 'firebase-admin/firestore'

import { Inject, Injectable } from '~/helpers/helper.di'
import { Firebase } from '~/configs/config.firebase'
import { logger } from '~/helpers/helper.logger'
import { CreateUserDTO, ParamsUserIdDTO, UpdateUserDTO } from '~/dtos/dto.user'
import { Environment } from '~/configs/config.env'

@Injectable()
export class UserRepository {
  constructor(
    @Inject('Firebase')
    private readonly firebase: Firebase,
  ) {}

  async generateToken(userId: string): Promise<string> {
    try {
      return this.firebase.auth().createCustomToken(userId)
    } catch (e: any) {
      logger(e, 'error')
      return undefined
    }
  }

  async checkUserEmail(email: string): Promise<UserRecord> {
    try {
      return this.firebase.auth().getUserByEmail(email)
    } catch (e: any) {
      logger(e, 'error')
      return undefined
    }
  }

  async verifiedToken(token: string): Promise<DecodedIdToken> {
    try {
      return this.firebase.auth().verifyIdToken(token, true)
    } catch (e: any) {
      logger(e, 'error')
      return undefined
    }
  }

  async findOne(options: Record<string, any>[]): Promise<DocumentData> {
    try {
      const firestore: FirebaseFirestore.Firestore = this.firebase.firestore()
      const collection: FirebaseFirestore.CollectionReference = firestore.collection('users')

      if (options.length > 0) {
        for (const option of options) {
          collection.where(option?.key, option?.operator, option?.value)
        }
      }

      const res: FirebaseFirestore.QuerySnapshot<DocumentData> = await collection.get()
      return res.docs.find((doc) => doc)
    } catch (e: any) {
      logger(e, 'error')
      return undefined
    }
  }

  async findById(id: string): Promise<DocumentData> {
    try {
      const firestore: FirebaseFirestore.Firestore = this.firebase.firestore()
      const collection: FirebaseFirestore.CollectionReference = firestore.collection('users')

      const res: FirebaseFirestore.QuerySnapshot<DocumentData> = await collection.where('id', '==', id).get()
      return res.docs.find((doc) => doc)
    } catch (e: any) {
      logger(e, 'error')
      return undefined
    }
  }

  async findAll(): Promise<DocumentData[]> {
    try {
      const firestore: FirebaseFirestore.Firestore = this.firebase.firestore()
      const collection: FirebaseFirestore.CollectionReference = firestore.collection('users')

      const res: FirebaseFirestore.QuerySnapshot<DocumentData> = await collection.get()
      return res.docs.map((doc: DocumentData) => doc)
    } catch (e: any) {
      logger(e, 'error')
      return undefined
    }
  }

  create(body: CreateUserDTO): Promise<FirebaseFirestore.DocumentReference<DocumentData, DocumentData>> {
    try {
      const firestore: FirebaseFirestore.Firestore = this.firebase.firestore()
      return firestore.collection('users').add(body)
    } catch (e: any) {
      logger(e, 'error')
      return undefined
    }
  }

  update(id: ParamsUserIdDTO, body: UpdateUserDTO): Promise<FirebaseFirestore.WriteResult> {
    try {
      const firestore: FirebaseFirestore.Firestore = this.firebase.firestore()

      const collection = firestore.collection('users')
      collection.where('id', '==', id)

      return collection.doc().set(body)
    } catch (e: any) {
      logger(e, 'error')
      return undefined
    }
  }
}
