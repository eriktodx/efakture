import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatTableDataSource } from '@angular/material/table'
import { Subscription } from 'rxjs'
import { NoteType } from 'src/app/enums/note-type.enum'
import { NoteModel } from 'src/app/models/note-model'
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service'
import { LogService } from 'src/app/services/log.service'
import { NotesService } from 'src/app/services/notes.service'
import { NotesEditComponent } from '../notes-edit/notes-edit.component'

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'btnUpdate', 'btnDelete']
  dataSource = new MatTableDataSource<NoteModel>([])
  dataSource$: Subscription
  loading = true
  types = NoteType

  constructor(
    private notesService: NotesService,
    private log: LogService,
    private dialog: MatDialog,
    private confirmDialog: ConfirmDialogService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.notesService
      .read(NoteModel, (ref) => ref.orderBy('dateCreated', 'asc'))
      .then((dataSource$) => {
        this.dataSource$ = dataSource$.subscribe((data) => {
          this.dataSource.data = data
          this.loading = false
        })
      })
  }

  ngOnDestroy(): void {
    this.dataSource$?.unsubscribe()
  }

  onItemClick(note?: NoteModel): void {
    this.dialog.open(NotesEditComponent, {
      width: '480px',
      data: note,
    })
  }

  async onDeleteClick(note: NoteModel): Promise<void> {
    try {
      const result = await this.confirmDialog.present(
        `Ste prepričani, da želite izbrisati izbran zapis?`
      )
      if (result) {
        await this.notesService.delete(note)
        this.snackBar.open(`Izbrisano`)
      }
    } catch (error) {
      this.log.error(error)
      this.snackBar.open('Sistemska napaka')
    }
  }
}
