import { DatePipe, DecimalPipe } from "@angular/common";
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { InvoiceModel } from "../../models/invoice-model";
import { PaymentModel } from "../../models/payment-model";
import { ConfirmDialogService } from "../../services/confirm-dialog.service";
import { InvoicesService } from "../../services/invoices.service";
import { PaymentsEditComponent } from "../payments-edit/payments-edit.component";

export interface DialogData {
  invoice: InvoiceModel
}

@Component({
  selector: "app-payments",
  templateUrl: "./payments.component.html",
  styleUrls: ["./payments.component.css"]
})
export class PaymentsComponent implements OnInit, OnDestroy {
  loading = false
  dataSource = new MatTableDataSource<PaymentModel>()
  dataSource$!: Subscription
  displayedColumns = [
    "day",
    "amount",
    "note",
    "btnUpdate",
    "btnDelete"
  ]
  sumAmount = 0
  invoice!: InvoiceModel

  constructor(
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe,
    private confirmDialog: ConfirmDialogService,
    private snackBar: MatSnackBar,
    private invoicesService: InvoicesService,
    private dialogRef: MatDialogRef<PaymentsComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: DialogData,
  ) { }

  ngOnInit() {
    this.refresh();
  }

  ngOnDestroy() {
    this.dataSource$?.unsubscribe();
  }

  refresh() {
    this.dataSource$?.unsubscribe();
    this.invoicesService
      .read(InvoiceModel, (ref: any) => {
        return ref.where("accNo", "==", this.dialogData.invoice.accNo);
      })
      .then((dataSource$) => {
        this.dataSource$ = dataSource$.subscribe((data) => {
          if (!data || data.length === 0) {
            this.snackBar.open("Napaka pri nalaganju evidence plačil. Manjkajoč koreninski element.");
            this.dialogRef.close();
          } else if (data.length > 1) {
            this.snackBar.open("Napaka pri nalaganju evidence plačil. Preveliko število elementov.");
            this.dialogRef.close();
          } else {
            this.invoice = data[0];
            const payments = this.invoice.payments;
            this.sumAmount = this.calcSumAmount(payments);
            this.dataSource.data = payments;
          }
          this.loading = false;
        });
      });
  }

  calcSumAmount(payments: PaymentModel[]) {
    return payments.reduce((a, b) => a + b.amount, 0);
  }

  onPaymentClick(payment?: PaymentModel) {
    this.dialog.open(PaymentsEditComponent, {
      width: "400px",
      disableClose: true,
      data: {
        invoice: this.invoice,
        payment,
      },
    });
  }

  async onCancelClick() {
    this.dialogRef.close(false);
  }

  async onDeleteClick(payment: PaymentModel) {
    try {
      const day = this.datePipe.transform(payment.day);
      const amount = this.decimalPipe.transform(payment.amount, "1.2-2");
      const result = await this.confirmDialog.present(
        `Ste prepričani, da želite izbrisati plačilo evidentirano dne ${day}, ki znaša ${amount} EUR?`
      );
      if (result) {
        const payments = this.invoice.payments;
        payments.splice(payments.indexOf(payment), 1);
        await this.invoicesService.update(this.invoice);
        this.snackBar.open("Izbrisano");
      }
    } catch (error) {
      this.snackBar.open(`Sistemska napaka. ${error}`);
    }
  }
}


