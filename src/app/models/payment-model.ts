import { parseFirestoreDate } from "../functions/parse-firestore-date";

export class PaymentModel {
  amount = 0;
  day?: Date;
  note = "";

  constructor(o?: any) {
    if (o != null) {
      if (typeof o === "object") {
        if (o.amount != null) {
          this.amount = o.amount;
        }
        if (o.day != null) {
          this.day = parseFirestoreDate(o.day);
        }
        if (o.note != null) {
          this.note = o.note;
        }
      }
    }
  }
}
