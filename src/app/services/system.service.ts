import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class SystemService {
  constructor(
    public store: AngularFirestore,
    public auth: AngularFireAuth
  ) { }

  private userLoaded = false;
  getCurrentUser(): Promise<firebase.User> {
    return new Promise(async (resolve, reject) => {
      if (this.userLoaded) {
        resolve(await this.auth.currentUser);
      }
      const unsubscribe: any = this.auth.onAuthStateChanged(async (user) => {
        (await unsubscribe)();
        this.userLoaded = true;
        resolve(user);
      }, reject);
    });
  }
}
