export interface FireDataInterface<T> {
  userId: string
  id: string
  deleted: boolean
  dateCreated: Date
  dateUpdated: Date
  dateDeleted: Date

  prepare(): T
}
