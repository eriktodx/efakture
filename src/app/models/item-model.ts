import {ItemType} from '../enums/item-type.enum'
import {globalScope} from '../functions/global-scope'
import {parseFirestoreDate} from '../functions/parse-firestore-date'
import {parseLocalFloat} from '../functions/parse-local-float'
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

  quantityModel = '0'
  priceModel = '0'
  taxModel = '0'
  discountModel = '0'
  combinedNameModel = ''

  constructor(o?: any) {
    if (o != null) {
      if (typeof o === 'object') {
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
        this.quantityModel = o._quantity != null
          ? o._quantity
          : globalScope.decimalPipe.transform(this.quantity, '1.2-2')
        this.priceModel = o._price != null
          ? o._price
          : globalScope.decimalPipe.transform(this.price, '1.2-2')
        this.taxModel = o._tax != null
          ? o._tax
          : globalScope.decimalPipe.transform(this.tax, '1.2-2')
        this.discountModel = o._discount != null
          ? o._discount
          : globalScope.decimalPipe.transform(this.discount, '1.2-2')
        this.combinedNameModel =
          (this.code != null && this.code.length > 0 ? `${this.code} - ` : ``) +
          `${this.name}` +
          ` - ${globalScope.decimalPipe.transform(this.price, '1.2-2')}`
      }
    }
  }

  prepare() {
    const clone = new ItemModel(this)
    clone.quantity = clone.quantityModel != null
      ? parseLocalFloat(clone.quantityModel)
      : clone.quantity
    delete clone.quantityModel
    clone.price = clone.priceModel != null
      ? parseLocalFloat(clone.priceModel)
      : clone.price
    delete clone.priceModel
    clone.tax = clone.taxModel != null
      ? parseLocalFloat(clone.taxModel)
      : clone.tax
    delete clone.taxModel
    clone.discount = clone.discountModel != null
      ? parseLocalFloat(clone.discountModel)
      : clone.discount
    delete clone.discountModel
    delete clone.id
    return removePrivateFields<ItemModel>(clone)
  }
}
