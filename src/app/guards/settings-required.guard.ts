import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { SettingsService } from "../services/settings.service";

@Injectable({
  providedIn: "root",
})
export class SettingsRequiredGuard implements CanActivate {
  constructor(
    private settingsService: SettingsService,
    private router: Router
  ) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (!await this.settingsService.exist()) {
      await this.router.navigateByUrl("/missing-settings");
      return false;
    } else {
      return true;
    }
  }
}
