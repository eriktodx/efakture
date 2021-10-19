import {InvoiceModel} from '../models/invoice-model'

export function calculateInvoiceTotalPaid(invoice: InvoiceModel) {
  invoice.totalPaid = invoice.payments.reduce((a, b) => a + b.amount, 0)
}
