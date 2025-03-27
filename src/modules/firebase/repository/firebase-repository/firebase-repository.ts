import { Inject, Injectable } from '@nestjs/common';
import { app, auth } from 'firebase-admin';

@Injectable()
export class FirebaseRepository {
  #auth: auth.Auth;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.#auth = this.firebaseApp.auth();
  }
}
