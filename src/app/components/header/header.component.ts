import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/services/system.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: firebase.User;
  @Input() sidenav: MatSidenav;

  get version() {
    return environment.version;
  }

  constructor(
    private system: SystemService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    this.user = await this.system.getCurrentUser();
  }

  onSignOutClick() {
    this.system.auth.signOut().then(() => {
      this.router.navigateByUrl('/');
      this.snackBar.open('Uspešno odjavljeni');
    });
  }
}
