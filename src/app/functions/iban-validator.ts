import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as IBAN from 'iban';

export function ibanValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return !IBAN.isValid(control.value) ? { 'iban': { value: control.value } } : null;
  };
}