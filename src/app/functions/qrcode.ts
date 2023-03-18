import { CreateData } from "./create-pdf-invoice";

function formatAmount(amount: number): string {
  const amountStr = amount.toFixed(2).replace(".", "");
  return amountStr.padStart(11, "0");
}

export function qrencode(data: CreateData): string {
  const text = [
    "UPNQR",
    "",
    "",
    "",
    "",
    data.invoice.client.fullName,
    data.invoice.client.address,
    data.invoice.client.postalCode + " " + data.invoice.client.postalOffice,
    formatAmount(data.invoice.grossAmount),
    "",
    "",
    "OTHR",
    "Invoice payment",
    data.datePipe.transform(data.invoice.validTo, data.dateFormat) || "",
    data.invoice.company.bankTRR.replace(/\s+/gi, "").trim(),
    data.settings.accounting.refPrefix + data.invoice.accNo,
    data.invoice.company.fullName,
    data.invoice.company.address,
    data.invoice.company.postalCode + " " + data.invoice.company.postalOffice,
  ];
  const textSum = String(text.reduce((a, b) => a + b.length, 0) + 19);
  return text.concat([textSum, "\n"]).join("\n");
}
