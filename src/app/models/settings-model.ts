import {EntityType} from '../enums/entity-type.enum'
import {parseFirestoreDate} from '../functions/parse-firestore-date'
import {removePrivateFields} from '../functions/remove-private-fields'
import {FireDataInterface} from '../interfaces/fire-data-interface'
import {AccountingModel} from './accounting-model'
import {EntityModel} from './entity-model'

export class SettingsModel implements FireDataInterface<SettingsModel> {
  userId: string
  id: string
  firstName = ''
  lastName = ''
  company = new EntityModel()
  accounting = new AccountingModel()
  deleted = false
  dateCreated: Date = null
  dateUpdated: Date = null
  dateDeleted: Date = null

  constructor(obj?: any) {
    if (obj != null) {
      if (typeof obj === 'object') {
        if (obj.userId != null) {
          this.userId = obj.userId
        }
        if (obj.id != null) {
          this.id = obj.id
        }
        if (obj.firstName != null) {
          this.firstName = obj.firstName
        }
        if (obj.lastName != null) {
          this.lastName = obj.lastName
        }
        if (obj.company != null) {
          this.company = new EntityModel(obj.company)
        }
        if (obj.accounting != null) {
          this.accounting = new AccountingModel(obj.accounting)
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
    this.company.type = EntityType.COMPANY
  }

  prepare() {
    const clone = new SettingsModel(this)
    delete clone.userId
    delete clone.id
    clone.company = {...removePrivateFields(clone.company)} as any
    delete clone.company.userId
    delete clone.company.id
    clone.accounting = {...removePrivateFields(clone.accounting)} as any
    return {...removePrivateFields(clone)} as any
  }
}
