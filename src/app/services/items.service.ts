import {Injectable} from '@angular/core'
import {BasicFireService} from '../classes/basic-fire-service'
import {ItemModel} from '../models/item-model'
import {SystemService} from './system.service'

@Injectable({
  providedIn: 'root'
})
export class ItemsService extends BasicFireService<ItemModel> {
  constructor(system: SystemService) {
    super(system, `items`)
  }
}
