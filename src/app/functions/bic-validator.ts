import { AbstractControl, ValidatorFn } from "@angular/forms";

export function bicValidatorRaw(value?: string) {
  if (value != null && typeof value === "string") {
    const regex =
      /^([A-Z]{6}[A-Z2-9][A-NP-Z1-9])(X{3}|[A-WY-Z0-9][A-Z0-9]{2})?$/;
    return regex.test(value.toUpperCase());
  }
  return false;
}

export function bicValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    return !bicValidatorRaw(value) ? { bic: { value: control.value } } : null;
  };
}
