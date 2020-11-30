import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { globalScope } from './functions/global-scope';
import { LogService } from './services/log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private firebaseApp: FirebaseApp,
    private log: LogService,
    datePipe: DatePipe,
    decimalPipe: DecimalPipe
  ) {
    globalScope.datePipe = datePipe;
    globalScope.decimalPipe = decimalPipe;
  }

  ngOnInit() {
    this.log.info("App Init");
    const db = this.firebaseApp.firestore();
    if (!environment.production) {
      db.settings({
        host: 'localhost:8080',
        ssl: false,
      });
    }
  }
}
