import { AbstractControl, ValidatorFn } from '@angular/forms';

export function decimalInputValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    //const result = new RegExp(/^(\d*\,)?\d+$/igm).test(control.value); // revision 1
    //const result = new RegExp(/^\d{1,3}(.\d{3})*(\,\d+)?$/).test(control.value); // revision 2
    const result = new RegExp(/^\d+(.\d{3})*(\,\d+)?$/).test(control.value); // revision 3
    return !result ? { 'decimalInput': { value: control.value } } : null;
  };
}