import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor(
    private firebaseApp: FirebaseApp
  ) { }

  private logEvent(message?: any) {
    try {
      const eventName = message instanceof Error
        ? message.name + ': ' + message.message
        : String(message);
      this.firebaseApp.analytics().logEvent(eventName);
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
