import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Subscription } from 'rxjs'
import { NoteType } from 'src/app/enums/note-type.enum'
import { NoteModel } from 'src/app/models/note-model'
import { NotesService } from 'src/app/services/notes.service'

interface NotesSelectDialogDataInterface {
  type: NoteType
}

@Component({
  selector: 'app-notes-select',
  templateUrl: './notes-select.component.html',
  styleUrls: ['./notes-select.component.css']
})
export class NotesSelectComponent implements OnInit, OnDestroy {
  dataSource$: Subscription
  dataSource: NoteModel[] = []
  loading = true

  get isEmpty() {
    return this.dataSource == null || this.dataSource.length === 0
  }

  constructor(
    private notesService: NotesService,
    private dialogRef: MatDialogRef<NotesSelectComponent>,
    @Inject(MAT_DIALOG_DATA) private data: NotesSelectDialogDataInterface,
  ) { }

  ngOnInit(): void {
    this.notesService.read(
      NoteModel,
      ref => ref
        // .where('type', '==', this.data.type)
        .orderBy('dateCreated', 'asc')
    ).then((dataSource$) => {
      this.dataSource$ = dataSource$.subscribe((data) => {
        this.dataSource = data
        this.loading = false
      })
    })
  }

  ngOnDestroy() {
    this.dataSource$?.unsubscribe()
  }

  onCancelClick(): void {
    this.dialogRef.close(false)
  }

  onSelectClick(note: NoteModel): void {
    this.dialogRef.close(note)
  }

}
