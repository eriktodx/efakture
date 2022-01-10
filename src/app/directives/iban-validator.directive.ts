import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";
import { ibanValidator } from "../functions/iban-validator";

@Directive({
  selector: "[appIbanValidator]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: IbanValidatorDirective,
      multi: true,
    },
  ],
})
export class IbanValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    if (control.value === "") {
      return null;
    }
    return ibanValidator()(control);
  }
}
