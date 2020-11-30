import { Injectable } from '@angular/core';
import { BasicFireService } from '../classes/basic-fire-service';
import { NoteModel } from '../models/note-model';
import { SystemService } from './system.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService extends BasicFireService<NoteModel> {
  constructor(system: SystemService) {
    super(system, `notes`);
  }
}
