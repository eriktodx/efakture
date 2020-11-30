import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { SettingsComponent } from '../components/settings/settings.component';
import { SettingsService } from '../services/settings.service';
import { SystemService } from '../services/system.service';
import { environment } from 'src/environments/environment';
import { SettingsModel } from '../models/settings-model';

@Injectable({
  providedIn: 'root',
})
export class SettingsRequiredGuard implements CanActivate {
  constructor(
    private settingsService: SettingsService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve) => {
      this.settingsService.read().then((settings) => {
        if (settings == null || settings.dateCreated == null) {
          this.router.navigateByUrl('/blank').then(() => {
            this.dialog.open(SettingsComponent, {
              width: '480px',
              data: { forced: true },
              disableClose: true,
            });
            resolve(false);
          });
        } else {
          resolve(true);
        }
      });
    });
  }
}
