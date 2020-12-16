import { DatePipe, DecimalPipe } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FirebaseApp } from '@angular/fire'
import { AngularFireAuth } from '@angular/fire/auth'
import { environment } from 'src/environments/environment'
import { globalScope } from './functions/global-scope'
import { LogService } from './services/log.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
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

  ngOnInit() {
    this.log.info("App Init")

    // When in development mode
    if (!environment.production) {
      // Connect to firestore emulator
      this.firebaseApp.firestore().settings({
        host: 'localhost:8088',
        ssl: false,
      })
      // Connect to authentication emulator
      this.auth.useEmulator('http://localhost:9099/')
    }
  }
}
