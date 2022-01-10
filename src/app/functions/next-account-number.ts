import { InvoiceType } from "../enums/invoice-type.enum";
import { SettingsModel } from "../models/settings-model";

export function nextAccountNumber(
  settings: SettingsModel,
  type: InvoiceType
): string {
  const { seqLength, yearShort, year } = settings.accounting;
  const seq =
    type === InvoiceType.OFFER
      ? settings.accounting.seqOffer
      : type === InvoiceType.PRE
      ? settings.accounting.seqPre
      : settings.accounting.seq;
  const yearStr = yearShort ? String(year).substring(2) : String(year);
  const seqStr = String(seq);
  const repeatTimes = Math.max(0, seqLength - seqStr.length);
  let repeat = "";
  while (repeat.length < repeatTimes) {
    repeat += "0";
  }
  return yearStr + "-" + repeat + seqStr;
}
