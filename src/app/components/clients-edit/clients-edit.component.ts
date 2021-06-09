import {Component, Inject, OnInit, ViewChild} from '@angular/core'
import {NgForm} from '@angular/forms'
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import {MatSnackBar} from '@angular/material/snack-bar'
import {EntityType} from 'src/app/enums/client-type.enum'
import {EntityModel} from 'src/app/models/entity-model'
import {ClientsService} from 'src/app/services/clients.service'
import {LogService} from 'src/app/services/log.service'

@Component({
  selector: 'app-clients-edit',
  templateUrl: './clients-edit.component.html',
  styleUrls: ['./clients-edit.component.css'],
})
export class ClientsEditComponent implements OnInit {
  types = EntityType
  @ViewChild('form') form: NgForm

  constructor(
    private clientsService: ClientsService,
    private log: LogService,
    public dialogRef: MatDialogRef<ClientsEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EntityModel,
    private snackBar: MatSnackBar
  ) {
    if (data == null) {
      this.data = new EntityModel()
    } else {
      this.data = new EntityModel(this.data)
    }
  }

  ngOnInit() {
    //
  }

  onCancelClick() {
    this.dialogRef.close(false)
  }

  async onFormSubmit() {
    if (!this.form.valid) {
      this.snackBar.open(`Obrazec vsebuje napake`)
      return
    }

    try {
      if (!this.data.id) {
        await this.clientsService.create(this.data)
      } else {
        await this.clientsService.update(this.data)
      }
      this.snackBar.open(`Shranjeno`)
      this.dialogRef.close(true)
    } catch (error) {
      this.log.error(error)
      this.snackBar.open(`Sistemska napaka`)
    }
  }
}
