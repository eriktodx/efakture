import { AbstractControl, ValidatorFn } from "@angular/forms";
import { isValid } from "./iban";

export function ibanValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return !isValid(control.value) ? { iban: { value: control.value } } : null;
  };
}
