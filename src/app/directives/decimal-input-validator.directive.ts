import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { decimalInputValidator } from '../functions/decimal-input-validator';

@Directive({
  selector: '[appDecimalInputValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: DecimalInputValidatorDirective, multi: true }]
})
export class DecimalInputValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    return decimalInputValidator()(control);
  }
}
