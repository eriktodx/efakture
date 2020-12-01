import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { LogService } from 'src/app/services/log.service';
import { SystemService } from 'src/app/services/system.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  loading = true;
  user: any;

  get version() {
    return environment.version;
  }

  constructor(
    private system: SystemService,
    private log: LogService,
    private router: Router
  ) { }

  async ngOnInit() {
    try {
      this.user = await this.system.getCurrentUser();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  async onContinueClick() {
    try {
      if (this.user == null) {
        const provider = new firebase.auth.GoogleAuthProvider();
        await this.system.auth.signInWithPopup(provider);
      }
      this.router.navigateByUrl('/dashboard');
    } catch (error) {
      this.log.error(error);
    }
  }
}
