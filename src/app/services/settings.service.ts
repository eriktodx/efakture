import {Injectable} from '@angular/core'
import {SettingsModel} from '../models/settings-model'
import {SystemService} from './system.service'

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private collectionName = `settings`

  constructor(private system: SystemService) {
  }

  async read() {
    const user = await this.system.getCurrentUser()
    const settings = await this.system.store
      .doc<SettingsModel>(`${this.collectionName}/${user.uid}`)
      .get()
      .toPromise()
    if (settings.exists) {
      return new SettingsModel(settings.data())
    }
    return new SettingsModel()
  }

  async update(data: SettingsModel) {
    const clone = {...data.prepare()}
    if (clone.dateCreated == null) {
      clone.dateCreated = new Date()
    } else {
      clone.dateUpdated = new Date()
    }
    const user = await this.system.getCurrentUser()
    return this.system.store
      .doc(`${this.collectionName}/${user.uid}`)
      .set(clone)
  }

  async exist() {
    const settings = await this.read()
    return settings != null && settings.dateCreated != null
  }
}
