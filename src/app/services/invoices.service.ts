import { Injectable } from '@angular/core';
import { BasicFireService } from '../classes/basic-fire-service';
import { InvoiceModel } from '../models/invoice-model';
import { SystemService } from './system.service';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService extends BasicFireService<InvoiceModel> {
  constructor(system: SystemService) {
    super(system, `invoices`);
  }
}
