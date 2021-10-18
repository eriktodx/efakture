import {ItemType} from '../enums/item-type.enum'
import {globalScope} from '../functions/global-scope'
import {parseFirestoreDate} from '../functions/parse-firestore-date'
import {removePrivateFields} from '../functions/remove-private-fields'
import {FireDataInterface} from '../interfaces/fire-data-interface'

export class ItemModel implements FireDataInterface<ItemModel> {
  userId: string
  id: string
  type = ItemType.ITEM
  code = ''
  name = ''
  description = ''
  unit = 'kos'
  quantity = 0
  price = 0
  tax = 0
  discount = 0

  netAmount = 0
  discountAmount = 0
  taxAmount = 0
  grossAmount = 0

  deleted = false
  dateCreated: Date = null
  dateUpdated: Date = null
  dateDeleted: Date = null

  combinedNameModel = ''

  constructor(o?: any) {
    if (o != null) {
      if (o.userId != null) {
        this.userId = o.userId
      }
      if (o.id != null) {
        this.id = o.id
      }
      if (o.type != null) {
        this.type = o.type
      }
      if (o.code != null) {
        this.code = o.code
      }
      if (o.name != null) {
        this.name = o.name
      }
      if (o.description != null) {
        this.description = o.description
      }
      if (o.unit != null) {
        this.unit = o.unit
      }
      if (o.quantity != null) {
        this.quantity = o.quantity
      }
      if (o.price != null) {
        this.price = o.price
      }
      if (o.tax != null) {
        this.tax = o.tax
      }
      if (o.discount != null) {
        this.discount = o.discount
      }
      if (o.netAmount != null) {
        this.netAmount = o.netAmount
      }
      if (o.discountAmount != null) {
        this.discountAmount = o.discountAmount
      }
      if (o.taxAmount != null) {
        this.taxAmount = o.taxAmount
      }
      if (o.grossAmount != null) {
        this.grossAmount = o.grossAmount
      }
      if (o.deleted != null) {
        this.deleted = o.deleted
      }
      if (o.dateCreated != null) {
        this.dateCreated = parseFirestoreDate(o.dateCreated)
      }
      if (o.dateUpdated != null) {
        this.dateUpdated = parseFirestoreDate(o.dateUpdated)
      }
      if (o.dateDeleted) {
        this.dateDeleted = parseFirestoreDate(o.dateDeleted)
      }
      this.combinedNameModel =
        (this.code != null && this.code.length > 0 ? `${this.code} - ` : ``) +
        `${this.name}` +
        ` - ${globalScope.decimalPipe.transform(this.price, '1.2-2')}`
    }
  }

  prepare() {
    const clone = new ItemModel(this)
    delete clone.id
    return removePrivateFields<ItemModel>(clone)
  }
}
