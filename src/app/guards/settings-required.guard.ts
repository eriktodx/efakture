import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router'
import { SettingsComponent } from '../components/settings/settings.component'
import { SettingsService } from '../services/settings.service'

@Injectable({
  providedIn: 'root',
})
export class SettingsRequiredGuard implements CanActivate {
  constructor(
    private settingsService: SettingsService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (!await this.settingsService.exist()) {
      await this.router.navigateByUrl('/missing-settings')
      /*
      this.dialog.open(SettingsComponent, {
        width: '480px',
        data: {
          forced: true
        },
        disableClose: true,
      })
      */
      return false
    } else {
      return true
    }
  }
}
