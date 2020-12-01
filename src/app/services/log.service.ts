import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireAnalytics } from '@angular/fire/analytics';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor(
    private app: FirebaseApp,
    private analytics: AngularFireAnalytics
  ) { }

  private logEvent(message?: any) {
    try {
      const eventName = message instanceof Error
        ? message.name + ': ' + message.message
        : String(message);
      // this.app.analytics().logEvent(eventName);
      this.analytics.logEvent(eventName);
    } catch (error) {
      console.error(error);
    }
  }

  info(message?: any, ...optionalParams: any[]): void {
    this.logEvent(message);
    console.info(message, ...optionalParams);
  }

  error(message?: any, ...optionalParams: any[]): void {
    this.logEvent(message);
    console.error(message, ...optionalParams);
  }
}
