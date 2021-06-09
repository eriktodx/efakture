import {Component, Inject, OnInit, ViewChild} from '@angular/core'
import {NgForm} from '@angular/forms'
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import {MatSnackBar} from '@angular/material/snack-bar'
import {NoteType} from 'src/app/enums/note-type.enum'
import {NoteModel} from 'src/app/models/note-model'
import {LogService} from 'src/app/services/log.service'
import {NotesService} from 'src/app/services/notes.service'

@Component({
  selector: 'app-notes-edit',
  templateUrl: './notes-edit.component.html',
  styleUrls: ['./notes-edit.component.css'],
})
export class NotesEditComponent implements OnInit {
  @ViewChild('form') from: NgForm
  data: NoteModel
  types = NoteType

  constructor(
    private notes: NotesService,
    private log: LogService,
    public dialogRef: MatDialogRef<NotesEditComponent>,
    @Inject(MAT_DIALOG_DATA) data: NoteModel,
    private snackBar: MatSnackBar
  ) {
    if (data == null) {
      this.data = new NoteModel()
    } else {
      this.data = new NoteModel(data)
    }
  }

  ngOnInit() {
  }

  onCancelClick() {
    this.dialogRef.close()
  }

  async onFormSubmit() {
    if (this.from.invalid) {
      this.snackBar.open(`Obrazec vsebuje napake`)
      return
    }

    try {
      if (!this.data.id) {
        await this.notes.create(this.data)
      } else {
        await this.notes.update(this.data)
      }
      this.snackBar.open(`Shranjeno`)
      this.dialogRef.close()
    } catch (error) {
      this.log.error(error)
      this.snackBar.open(`Sistemska napaka`)
    }
  }
}
