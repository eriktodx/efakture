import { DatePipe, DecimalPipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatRadioChange } from "@angular/material/radio";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import firebase from "firebase/compat/app";
import { Subscription } from "rxjs";
import { InvoiceType } from "src/app/enums/invoice-type.enum";
import { createPdfInvoice } from "src/app/functions/create-pdf-invoice";
import { EntityModel } from "src/app/models/entity-model";
import { InvoiceModel } from "src/app/models/invoice-model";
import { ConfirmDialogService } from "src/app/services/confirm-dialog.service";
import { InvoicesService } from "src/app/services/invoices.service";
import { SettingsService } from "src/app/services/settings.service";
import { calculateInvoiceTotalPaid } from "../../functions/calculate-invoice-total-paid";
import { InvoicesEditComponent } from "../invoices-edit/invoices-edit.component";
import { PaymentsComponent } from "../payments/payments.component";

@Component({
  selector: "app-invoices",
  templateUrl: "./invoices.component.html",
  styleUrls: ["./invoices.component.css"],
})
export class InvoicesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    "accountNo",
    "client",
    "netAmount",
    "discountAmount",
    "taxAmount",
    "grossAmount",
    "totalPaid",
    "btnPayments",
    "btnPdf",
    "btnUpdate",
    "btnDelete",
  ];
  dataSource = new MatTableDataSource<InvoiceModel>();
  dataSource$!: Subscription;
  loading = true;
  type = InvoiceType.INVOICE;
  types = InvoiceType;
  sum = this.createEmptySum();

  constructor(
    private invoicesService: InvoicesService,
    private settingsService: SettingsService,
    private confirmDialog: ConfirmDialogService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe,
    route: ActivatedRoute
  ) {
    const type = route.snapshot.data?.type;
    if (type != null) {
      this.type = type;
    } else {
      this.type = InvoiceType.INVOICE;
    }
  }

  ngOnInit() {
    if (this.type !== InvoiceType.INVOICE) {
      ["totalPaid", "btnPayments"].forEach((x) => {
        this.displayedColumns.splice(this.displayedColumns.indexOf(x), 1);
      });
    }
    this.refresh("12_MONTHS");
  }

  ngOnDestroy() {
    this.dataSource$?.unsubscribe();
  }

  refresh(filter?: string) {
    this.dataSource$?.unsubscribe();
    this.invoicesService
      .read(InvoiceModel, (ref: any) => {
        let query = ref.where("type", "==", this.type);
        query = this.applyFilter(query, filter);
        return query.orderBy("accNo", "desc");
      })
      .then((dataSource$) => {
        this.dataSource$ = dataSource$.subscribe((data) => {
          data.forEach((x) => calculateInvoiceTotalPaid(x));
          this.sum = this.calcSums(data);
          this.dataSource.data = data;
          this.loading = false;
        });
      });
  }

  applyFilter(
    query: firebase.firestore.Query<firebase.firestore.DocumentData>,
    filter?: string
  ) {
    if (filter) {
      const span = filter === "3_MONTHS" ? 3 : filter === "6_MONTHS" ? 6 : 12;
      const past = new Date();
      past.setMonth(past.getMonth() - span);
      query = query.where("validFrom", ">=", past).orderBy("validFrom", "desc");
    }
    return query;
  }

  createEmptySum() {
    return {
      netAmount: 0,
      discountAmount: 0,
      taxAmount: 0,
      grossAmount: 0,
      totalPaid: 0,
    };
  }

  calcSums(invoices: InvoiceModel[]) {
    return invoices.reduce((a, b) => {
      a.netAmount += b.netAmount;
      a.discountAmount += b.discountAmount;
      a.taxAmount += b.taxAmount;
      a.grossAmount += b.grossAmount;
      a.totalPaid += b.totalPaid || 0;
      return a;
    }, this.createEmptySum());
  }

  onFilterChange(change: MatRadioChange) {
    this.refresh(change.value);
  }

  onInvoiceClick(invoice?: EntityModel): void {
    this.dialog.open(InvoicesEditComponent, {
      width: "800px",
      disableClose: true,
      data: {
        invoice,
        type: this.type,
      },
    });
  }

  async onPaymentsClick(invoice: InvoiceModel) {
    this.dialog.open(PaymentsComponent, {
      width: "600px",
      disableClose: true,
      data: {
        invoice,
      },
    });
  }

  async onPdfClick(invoice: InvoiceModel) {
    try {
      if (invoice.pdfGenerating) {
        return;
      }
      invoice.pdfGenerating = true;
      this.snackBar.open("Generiram PDF datoteko");
      const pdf = createPdfInvoice({
        settings: await this.settingsService.read(),
        invoice,
        datePipe: this.datePipe,
        decimalPipe: this.decimalPipe,
      });
      pdf.download(invoice.accNo, () => {
        this.snackBar.open("Prenašam PDF datoteko");
      });
    } catch (error) {
      this.snackBar.open(`Sistemska napaka. ${error}`);
    } finally {
      invoice.pdfGenerating = false;
    }
  }

  async onDeleteClick(invoice: InvoiceModel): Promise<void> {
    try {
      let typeText = "";
      if (invoice.type === InvoiceType.INVOICE) {
        typeText = "računov";
      } else if (invoice.type === InvoiceType.OFFER) {
        typeText = "ponudb";
      } else if (invoice.type === InvoiceType.PRE) {
        typeText = "predračunov";
      }
      const result = await this.confirmDialog.present(
        `*** POZOR *** Že potrjenih ${typeText} se praviloma NE SME brisati. Vseeno izbrišem?`
      );
      if (result) {
        await this.invoicesService.delete(invoice);
        this.snackBar.open("Izbrisano");
      }
    } catch (error) {
      this.snackBar.open(`Sistemska napaka. ${error}`);
    }
  }
}
