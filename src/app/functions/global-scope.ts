import { DatePipe, DecimalPipe } from "@angular/common";

export const globalScope: {
  datePipe?: DatePipe
  decimalPipe?: DecimalPipe
} = {};
