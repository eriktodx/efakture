import { DatePipe, DecimalPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { environment } from '../../environments/environment';
import { globalScope } from '../functions/global-scope';

@Injectable({
  providedIn: 'root',
})
export class AppInitGuard implements CanActivate {
  constructor(
    private firebaseApp: FirebaseApp,
    private auth: AngularFireAuth,
    datePipe: DatePipe,
    decimalPipe: DecimalPipe,
    private snackBar: MatSnackBar
  ) {
    globalScope.datePipe = datePipe;
    globalScope.decimalPipe = decimalPipe;
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {
      if (!environment.production) {
        // Connect to firestore emulator
        this.firebaseApp.firestore().settings({
          host: 'localhost:8088',
          ssl: false,
        });

        // Connect to authentication emulator
        await this.auth.useEmulator('http://localhost:9099/');
      }

      await this.auth.setPersistence('local');

      return true;
    } catch (error) {
      this.snackBar.open(`Med inicializacijo je prišlo do napake. ${error}`);
      return false;
    }
  }
}
