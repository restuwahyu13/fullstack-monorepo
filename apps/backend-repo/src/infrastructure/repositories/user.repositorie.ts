import { DecodedIdToken, UserRecord } from 'firebase-admin/auth'
import { DocumentData } from 'firebase-admin/firestore'

import { Inject, Injectable } from '~/infrastructure/common/helpers/helper.di'
import { Firebase } from '~/infrastructure/common/configs/config.firebase'
import { logger } from '~/infrastructure/common/helpers/helper.logger'
import { EntityUser } from '~/infrastructure/entities/user.entity'
import { CreateUserDTO, ParamsUserIdDTO, UpdateUserDTO } from '~/domain/dtos/user.dto'

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

  async findOne(options: Record<string, any>[]): Promise<EntityUser> {
    try {
      const firestore: FirebaseFirestore.Firestore = this.firebase.firestore()
      const collection: FirebaseFirestore.CollectionReference = firestore.collection('users')

      if (options.length > 0) {
        for (const option of options) {
          collection.where(option?.key, option?.operator, option?.value)
        }
      }

      const res: FirebaseFirestore.DocumentSnapshot = await collection.doc().get()
      return res.data() as any
    } catch (e: any) {
      logger(e, 'error')
      return undefined
    }
  }

  async findById(id: string): Promise<EntityUser> {
    try {
      const firestore: FirebaseFirestore.Firestore = this.firebase.firestore()
      const collection: FirebaseFirestore.CollectionReference = firestore.collection('users')

      const res: FirebaseFirestore.DocumentSnapshot = await collection.doc(id).get()
      return res.data() as any
    } catch (e: any) {
      logger(e, 'error')
      return undefined
    }
  }

  async findAll(): Promise<EntityUser[]> {
    let records: Record<string, any>[] = []

    try {
      const firestore: FirebaseFirestore.Firestore = this.firebase.firestore()
      const collection: FirebaseFirestore.CollectionReference = firestore.collection('users')

      const res: FirebaseFirestore.QuerySnapshot<DocumentData> = await collection.get()
      res.forEach((doc: FirebaseFirestore.QueryDocumentSnapshot<DocumentData, DocumentData>) => {
        if (doc) {
          records.push({
            id: doc.id,
            ...doc.data(),
            created_time: doc.createTime.toDate(),
            updated_time: doc.updateTime.toDate(),
          })
        }
      })

      return records as any
    } catch (e: any) {
      logger(e, 'error')
      return undefined
    } finally {
      records = []
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

  update(param: ParamsUserIdDTO, body: UpdateUserDTO): Promise<FirebaseFirestore.WriteResult> {
    try {
      const firestore: FirebaseFirestore.Firestore = this.firebase.firestore()
      return firestore.collection('users').doc(param.id).set(body)
    } catch (e: any) {
      logger(e, 'error')
      return undefined
    }
  }
}
