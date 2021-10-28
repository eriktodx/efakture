import { EntityType } from "../enums/client-type.enum";
import { parseFirestoreDate } from "../functions/parse-firestore-date";
import { removePrivateFields } from "../functions/remove-private-fields";
import { FireDataInterface } from "../interfaces/fire-data-interface";

export class EntityModel implements FireDataInterface<EntityModel> {
  userId?: string
  id?: string
  type = EntityType.PERSON
  firstName = ""
  lastName = ""
  name = ""
  address = ""
  postalCode = ""
  postalOffice = ""
  country = "Slovenija"
  isTaxPayer = false
  taxId = ""
  regNo = ""
  bankName = ""
  bankBIC = ""
  bankTRR = ""
  email = ""
  phone = ""
  fax = ""
  website = ""

  deleted = false
  dateCreated?: Date
  dateUpdated?: Date
  dateDeleted?: Date

  get isPerson(): boolean {
    return (
      this.type === EntityType.PERSON ||
      this.type === EntityType.PERSON_WITH_ACTIVITY
    );
  }

  get isCompany(): boolean {
    return this.type === EntityType.COMPANY;
  }

  get isTaxEligible(): boolean {
    return (
      this.type === EntityType.PERSON_WITH_ACTIVITY ||
      this.type === EntityType.COMPANY
    );
  }

  get fullName() {
    if (this.isPerson) {
      return `${this.firstName} ${this.lastName}`;
    } else {
      return this.name;
    }
  }

  constructor(obj?: any) {
    if (obj != null) {
      if (typeof obj === "object") {
        if (obj.userId != null) {
          this.userId = obj.userId;
        }
        if (obj.id != null) {
          this.id = obj.id;
        }
        if (obj.type != null) {
          this.type = obj.type;
        }
        if (obj.firstName != null) {
          this.firstName = obj.firstName;
        }
        if (obj.lastName != null) {
          this.lastName = obj.lastName;
        }
        if (obj.name != null) {
          this.name = obj.name;
        }
        if (obj.address != null) {
          this.address = obj.address;
        }
        if (obj.postalCode != null) {
          this.postalCode = obj.postalCode;
        }
        if (obj.postalOffice != null) {
          this.postalOffice = obj.postalOffice;
        }
        if (obj.country != null) {
          this.country = obj.country;
        }
        if (obj.isTaxPayer != null) {
          this.isTaxPayer = obj.isTaxPayer;
        }
        if (obj.taxId != null) {
          this.taxId = obj.taxId;
        }
        if (obj.regNo != null) {
          this.regNo = obj.regNo;
        }
        if (obj.bankName != null) {
          this.bankName = obj.bankName;
        }
        if (obj.bankBIC != null) {
          this.bankBIC = obj.bankBIC;
        }
        if (obj.bankTRR != null) {
          this.bankTRR = obj.bankTRR;
        }
        if (obj.email != null) {
          this.email = obj.email;
        }
        if (obj.phone != null) {
          this.phone = obj.phone;
        }
        if (obj.fax != null) {
          this.fax = obj.fax;
        }
        if (obj.website != null) {
          this.website = obj.website;
        }
        if (obj.deleted != null) {
          this.deleted = obj.deleted;
        }
        if (obj.dateCreated != null) {
          this.dateCreated = parseFirestoreDate(obj.dateCreated);
        }
        if (obj.dateUpdated != null) {
          this.dateUpdated = parseFirestoreDate(obj.dateUpdated);
        }
        if (obj.dateDeleted != null) {
          this.dateDeleted = parseFirestoreDate(obj.dateDeleted);
        }
      }
    }
  }

  prepare() {
    const clone = new EntityModel(this);
    delete clone.id;
    return removePrivateFields(clone);
  }
}
