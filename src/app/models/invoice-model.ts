import {InvoiceStatus} from '../enums/invoice-status.enum'
import {InvoiceType} from '../enums/invoice-type.enum'
import {removePrivateFields} from '../functions/remove-private-fields'
import {FireDataInterface} from '../interfaces/fire-data-interface'
import {EntityModel} from './entity-model'
import {ItemModel} from './item-model'
import {PaymentModel} from './payment-model'
import {parseFirestoreDate} from '../functions/parse-firestore-date'

export class InvoiceModel implements FireDataInterface<InvoiceModel> {
  userId: string
  id: string

  status = InvoiceStatus.IN_PREPARATION
  accNo = ''
  type = InvoiceType.INVOICE
  reasonForChange = ''
  headerMsg = ''
  contentMsg = ''
  footerMsg = ''
  company: EntityModel = null
  client: EntityModel = null
  items: ItemModel[] = []
  validFrom: Date = null
  validTo: Date = null
  supply = false
  supplyFrom: Date = null
  supplyTo: Date = null
  authorName = ''
  authorLocation = ''
  netAmount = 0
  discountAmount = 0
  taxAmount = 0
  grossAmount = 0
  payments: PaymentModel[] = []
  revisions: InvoiceModel[] = []

  deleted = false
  dateCreated: Date = null
  dateUpdated: Date = null
  dateDeleted: Date = null

  totalPaid?: number
  pdfGenerating?: boolean

  constructor(obj?: any) {
    if (obj != null) {
      if (typeof obj === 'object') {
        if (obj.userId != null) {
          this.userId = obj.userId
        }
        if (obj.id != null) {
          this.id = obj.id
        }
        if (obj.status != null) {
          this.status = obj.status
        }
        if (obj.accNo != null) {
          this.accNo = obj.accNo
        }
        if (obj.type != null) {
          this.type = obj.type
        }
        if (obj.reasonForChange != null) {
          this.reasonForChange = obj.reasonForChange
        }
        if (obj.headerMsg != null) {
          this.headerMsg = obj.headerMsg
        }
        if (obj.contentMsg != null) {
          this.contentMsg = obj.contentMsg
        }
        if (obj.footerMsg != null) {
          this.footerMsg = obj.footerMsg
        }
        if (obj.company != null) {
          this.company = new EntityModel(obj.company)
        }
        if (obj.client != null) {
          this.client = new EntityModel(obj.client)
        }
        if (obj.items != null) {
          this.items = obj.items.map((x) => new ItemModel(x))
        }
        if (obj.validFrom != null) {
          this.validFrom = parseFirestoreDate(obj.validFrom)
        }
        if (obj.validTo != null) {
          this.validTo = parseFirestoreDate(obj.validTo)
        }
        if (obj.supply != null) {
          this.supply = obj.supply
        }
        if (obj.supplyFrom != null) {
          this.supplyFrom = parseFirestoreDate(obj.supplyFrom)
        }
        if (obj.supplyTo != null) {
          this.supplyTo = parseFirestoreDate(obj.supplyTo)
        }
        if (obj.authorName != null) {
          this.authorName = obj.authorName
        }
        if (obj.authorLocation != null) {
          this.authorLocation = obj.authorLocation
        }
        if (obj.netAmount != null) {
          this.netAmount = obj.netAmount
        }
        if (obj.discountAmount != null) {
          this.discountAmount = obj.discountAmount
        }
        if (obj.taxAmount != null) {
          this.taxAmount = obj.taxAmount
        }
        if (obj.grossAmount != null) {
          this.grossAmount = obj.grossAmount
        }
        if (obj.payments != null) {
          this.payments = obj.payments.map((x) => new PaymentModel(x))
        }
        if (obj.revisions != null) {
          this.revisions = obj.revisions.map((x) => new InvoiceModel(x))
        }
        if (obj.deleted != null) {
          this.deleted = obj.deleted
        }
        if (obj.dateCreated != null) {
          this.dateCreated = parseFirestoreDate(obj.dateCreated)
        }
        if (obj.dateUpdated != null) {
          this.dateUpdated = parseFirestoreDate(obj.dateUpdated)
        }
        if (obj.dateDeleted != null) {
          this.dateDeleted = parseFirestoreDate(obj.dateDeleted)
        }
      }
    }
  }

  prepare() {
    const clone = new InvoiceModel(this)
    delete clone.id
    clone.company = {...clone.company.prepare()} as any
    delete clone.company.userId
    delete clone.company.id
    clone.client = {...clone.client.prepare()} as any
    delete clone.client.userId
    delete clone.client.id
    clone.items = clone.items.slice().map((x) => {
      const item = {...x.prepare()} as any
      delete item.userId
      delete item.id
      return item
    })
    clone.payments = clone.payments.slice().map((x) => {
      return {...x} as any
    })
    clone.revisions = clone.revisions.slice().map((x) => {
      return {...x.prepare()} as any
    })
    delete clone.totalPaid
    delete clone.pdfGenerating
    return removePrivateFields(clone)
  }
}
