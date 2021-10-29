import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { SystemService } from "../services/system.service";

@Injectable({
  providedIn: "root"
})
export class UserRequiredGuard implements CanActivate {

  constructor(
    private system: SystemService
  ) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return await this.system.getCurrentUser() != null;
  }

}
