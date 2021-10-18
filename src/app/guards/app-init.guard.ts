import {Injectable} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router'
import {environment} from '../../environments/environment'
import {FirebaseApp} from '@angular/fire'
import {AngularFireAuth} from '@angular/fire/auth'
import {LogService} from '../services/log.service'
import {DatePipe, DecimalPipe} from '@angular/common'
import {globalScope} from '../functions/global-scope'

@Injectable({
  providedIn: 'root'
})
export class AppInitGuard implements CanActivate {

  constructor(
    private firebaseApp: FirebaseApp,
    private auth: AngularFireAuth,
    private log: LogService,
    datePipe: DatePipe,
    decimalPipe: DecimalPipe
  ) {
    globalScope.datePipe = datePipe
    globalScope.decimalPipe = decimalPipe
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    try {
      // When in development mode
      if (!environment.production) {
        // Connect to firestore emulator
        this.firebaseApp.firestore().settings({
          host: 'localhost:8088',
          ssl: false,
        })
        // Connect to authentication emulator
        await this.auth.useEmulator('http://localhost:9099/')
      }

      await this.auth.setPersistence('local')

      return true
    } catch (error) {
      console.log('Unable to initialize app')
      console.error(error)
      return false
    }
  }

}
