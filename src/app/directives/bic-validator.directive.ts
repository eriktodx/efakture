import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { bicValidator } from '../functions/bic-validator';

@Directive({
  selector: '[appBicValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: BicValidatorDirective, multi: true }]
})
export class BicValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    if (control.value === '') return null;
    return bicValidator()(control);
  }
}
