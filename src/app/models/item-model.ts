import { ItemType } from '../enums/item-type.enum';
import { globalScope } from '../functions/global-scope';
import { parseFirestoreDate } from '../functions/parse-firestore-date';
import { parseLocalFloat } from '../functions/parse-local-float';
import { removePrivateFields } from '../functions/remove-private-fields';
import { FireDataInterface } from '../interfaces/fire-data-interface';

export class ItemModel implements FireDataInterface<ItemModel> {
  userId: string;
  id: string;
  type = ItemType.ITEM;
  code = '';
  name = '';
  description = '';
  unit = '';
  quantity = 0;
  price = 0;
  tax = 0;
  discount = 0;

  netAmount = 0;
  discountAmount = 0;
  taxAmount = 0;
  grossAmount = 0;

  deleted = false;
  dateCreated: Date = null;
  dateUpdated: Date = null;
  dateDeleted: Date = null;

  _quantity: string;
  _price: string;
  _tax: string;
  _discount: string;
  _combinedName: string;

  constructor(obj?: any) {
    if (obj != null) {
      if (typeof obj === 'object') {
        if (obj.userId != null) this.userId = obj.userId;
        if (obj.id != null) this.id = obj.id;
        if (obj.type != null) this.type = obj.type;
        if (obj.code != null) this.code = obj.code;
        if (obj.name != null) this.name = obj.name;
        if (obj.description != null) this.description = obj.description;
        if (obj.unit != null) this.unit = obj.unit;
        if (obj.quantity != null) this.quantity = obj.quantity;
        if (obj.price != null) this.price = obj.price;
        if (obj.tax != null) this.tax = obj.tax;
        if (obj.discount != null) this.discount = obj.discount;
        if (obj.netAmount != null) this.netAmount = obj.netAmount;
        if (obj.discountAmount != null)
          this.discountAmount = obj.discountAmount;
        if (obj.taxAmount != null) this.taxAmount = obj.taxAmount;
        if (obj.grossAmount != null) this.grossAmount = obj.grossAmount;
        if (obj.deleted != null) this.deleted = obj.deleted;
        if (obj.dateCreated != null)
          this.dateCreated = parseFirestoreDate(obj.dateCreated);
        if (obj.dateUpdated != null)
          this.dateUpdated = parseFirestoreDate(obj.dateUpdated);
        if (obj.dateDeleted)
          this.dateDeleted = parseFirestoreDate(obj.dateDeleted);
        this._quantity =
          obj._quantity != null
            ? obj._quantity
            : globalScope.decimalPipe.transform(this.quantity, '1.2-2');
        this._price =
          obj._price != null
            ? obj._price
            : globalScope.decimalPipe.transform(this.price, '1.2-2');
        this._tax =
          obj._tax != null
            ? obj._tax
            : globalScope.decimalPipe.transform(this.tax, '1.2-2');
        this._discount =
          obj._discount != null
            ? obj._discount
            : globalScope.decimalPipe.transform(this.discount, '1.2-2');
        this._combinedName =
          (this.code != null && this.code.length > 0 ? `${this.code} - ` : ``) +
          `${this.name}` +
          ` - ${globalScope.decimalPipe.transform(this.price, '1.2-2')}`;
      }
    }
  }

  prepare() {
    const clone = new ItemModel(this);
    clone.quantity =
      clone._quantity != null
        ? parseLocalFloat(clone._quantity)
        : clone.quantity;
    delete clone._quantity;
    clone.price =
      clone._price != null ? parseLocalFloat(clone._price) : clone.price;
    delete clone._price;
    clone.tax = clone._tax != null ? parseLocalFloat(clone._tax) : clone.tax;
    delete clone._tax;
    clone.discount =
      clone._discount != null
        ? parseLocalFloat(clone._discount)
        : clone.discount;
    delete clone._discount;
    delete clone.id;
    return removePrivateFields<ItemModel>(clone);
  }
}
