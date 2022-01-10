import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import firebase from "firebase/compat/app";

@Injectable({
  providedIn: "root",
})
export class SystemService {
  constructor(public store: AngularFirestore, public auth: AngularFireAuth) {}

  private userLoaded = false;

  getCurrentUser(): Promise<firebase.User | null> {
    return new Promise(async (resolve, reject) => {
      if (this.userLoaded) {
        resolve(await this.auth.currentUser);
      }
      const unsubscribe = this.auth.onAuthStateChanged(async (user) => {
        (await unsubscribe)();
        this.userLoaded = true;
        resolve(user);
      }, reject);
    });
  }
}
