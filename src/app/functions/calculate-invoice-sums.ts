import { InvoiceModel } from '../models/invoice-model'

export function calculateInvoiceSums(invoice: InvoiceModel): InvoiceModel {
  invoice.netAmount = 0
  invoice.discountAmount = 0
  invoice.taxAmount = 0
  invoice.grossAmount = 0

  for (const item of invoice.items) {
    const net = (item.netAmount = item.price * item.quantity)
    const discount = (item.discountAmount = net * (item.discount / 100))
    const tax = (item.taxAmount = (net - discount) * (item.tax / 100))
    const gross = (item.grossAmount = net - discount + tax)

    invoice.netAmount += net
    invoice.discountAmount += discount
    invoice.taxAmount += tax
    invoice.grossAmount += gross
  }

  return invoice
}
