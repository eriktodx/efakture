import { parseFirestoreDate } from "../functions/parse-firestore-date";
import { FireDataInterface } from "../interfaces/fire-data-interface";

export class EmployeeModel implements FireDataInterface<EmployeeModel> {
  userId?: string;
  id?: string;
  firstName = "";
  lastName = "";
  address = "";
  postalCode = "";
  postalOffice = "";
  country = "";
  dateEmployed = new Date();
  taxId = "";
  sso = "";
  bank = {
    iban: "",
    bic: "",
    name: "",
  };
  hourly: {
    dateValid: Date;
    amount: number;
  }[] = [];
  vacation: {
    dateFrom: Date;
    dateUntil: Date;
  }[] = [];
  contractFile = "";
  deleted = false;
  dateCreated?: Date;
  dateUpdated?: Date;
  dateDeleted?: Date;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor(obj?: any) {
    if (obj != null) {
      if (typeof obj === "object") {
        this.userId = obj.userId ?? null;
        this.id = obj.id ?? null;
        this.firstName = obj.firstName ?? null;
        this.lastName = obj.lastName ?? null;
        this.address = obj.address ?? null;
        this.postalCode = obj.postalCode ?? null;
        this.postalOffice = obj.postalOffice ?? null;
        this.country = obj.country ?? null;
        this.dateEmployed = parseFirestoreDate(obj.dateEmployed);
        this.taxId = obj.taxId ?? null;
        this.sso = obj.sso ?? null;
        this.bank = obj.bank ?? {};
        this.bank.iban = obj.bank.iban ?? null;
        this.bank.bic = obj.bank.bic ?? null;
        this.bank.name = obj.bank.name ?? null;
        this.hourly = obj.hourly ?? [];
        this.vacation = obj.vacation ?? [];
        this.contractFile = obj.contractFile ?? null;
        this.deleted = obj.deleted ?? null;
        this.dateCreated = obj.dateCreated ?? null;
        this.dateUpdated = obj.dateUpdated ?? null;
        this.dateDeleted = obj.dateDeleted ?? null;
      }
    }
  }

  prepare() {
    const clone = Object.assign({}, this);
    clone.bank = Object.assign({}, clone.bank);
    clone.hourly = clone.hourly.slice().map((x) => Object.assign({}, x));
    clone.vacation = clone.vacation.slice().map((x) => Object.assign({}, x));
    clone.dateEmployed = new Date(clone.dateEmployed);
    clone.dateCreated = new Date(clone.dateCreated || new Date());
    clone.dateUpdated = new Date(clone.dateUpdated || new Date());
    clone.dateDeleted = new Date(clone.dateDeleted || new Date());
    return clone;
  }
}
