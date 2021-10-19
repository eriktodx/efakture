import {Component, Inject, OnInit, ViewChild} from '@angular/core'
import {PaymentModel} from '../../models/payment-model'
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog'
import {NgForm} from '@angular/forms'
import {MatSnackBar} from '@angular/material/snack-bar'
import {InvoicesService} from '../../services/invoices.service'
import {LogService} from '../../services/log.service'
import {InvoiceModel} from '../../models/invoice-model'

export interface DialogData {
  invoice: InvoiceModel
  payment: PaymentModel
}

@Component({
  selector: 'app-payments-edit',
  templateUrl: './payments-edit.component.html',
  styleUrls: ['./payments-edit.component.css']
})
export class PaymentsEditComponent implements OnInit {
  @ViewChild('form') form: NgForm
  index: number
  data: PaymentModel

  constructor(
    private snackBar: MatSnackBar,
    private invoicesService: InvoicesService,
    private log: LogService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<PaymentsEditComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: DialogData,
  ) {
  }

  ngOnInit() {
    const {invoice, payment} = this.dialogData
    this.index = invoice.payments.indexOf(payment)
    this.data = new PaymentModel(payment)
  }

  async onCancelClick() {
    this.dialogRef.close(false)
  }

  async onFormSubmit() {
    if (this.form.invalid) {
      this.snackBar.open(`Obrazec vsebuje napake`)
      return
    }

    try {
      const invoice = this.dialogData.invoice
      if (this.index >= 0) {
        invoice.payments.splice(this.index, 1, this.data)
      } else {
        invoice.payments.push(this.data)
      }
      await this.invoicesService.update(invoice)
      this.dialogRef.close(true)
    } catch (error) {
      this.log.error(error)
    }
  }
}
