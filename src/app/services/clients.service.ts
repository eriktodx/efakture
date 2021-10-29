import { Injectable } from "@angular/core";
import { BasicFireService } from "../classes/basic-fire-service";
import { EntityModel } from "../models/entity-model";
import { SystemService } from "./system.service";

@Injectable({
  providedIn: "root"
})
export class ClientsService extends BasicFireService<EntityModel> {
  constructor(system: SystemService) {
    super(system, "clients");
  }
}
