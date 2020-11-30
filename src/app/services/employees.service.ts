import { Injectable } from '@angular/core';
import { BasicFireService } from '../classes/basic-fire-service';
import { EmployeeModel } from '../models/employee-model';
import { SystemService } from './system.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService extends BasicFireService<EmployeeModel> {
  constructor(system: SystemService) {
    super(system, `employees`);
  }
}
