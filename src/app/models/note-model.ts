import { parseFirestoreDate } from "../functions/parse-firestore-date";
import { removePrivateFields } from "../functions/remove-private-fields";
import { FireDataInterface } from "../interfaces/fire-data-interface";

export class NoteModel implements FireDataInterface<NoteModel> {
  userId?: string
  id?: string
  name = ""
  description = ""
  deleted = false
  dateCreated?: Date
  dateUpdated?: Date
  dateDeleted?: Date

  constructor(obj?: any) {
    if (obj != null) {
      if (typeof obj === "object") {
        if (obj.userId != null) {
          this.userId = obj.userId;
        }
        if (obj.id != null) {
          this.id = obj.id;
        }
        if (obj.name != null) {
          this.name = obj.name;
        }
        if (obj.description != null) {
          this.description = obj.description;
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
    const clone = new NoteModel(this);
    delete clone.id;
    return removePrivateFields<NoteModel>(clone);
  }
}
