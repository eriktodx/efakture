import {DatePipe, DecimalPipe} from '@angular/common'
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {MatDialog} from '@angular/material/dialog'
import {MatSnackBar} from '@angular/material/snack-bar'
import {MatTableDataSource} from '@angular/material/table'
import {ActivatedRoute, RouterOutlet} from '@angular/router'
import {Subscription} from 'rxjs'
import {InvoiceType} from 'src/app/enums/invoice-type.enum'
import {createPdfInvoice} from 'src/app/functions/create-pdf-invoice'
import {EntityModel} from 'src/app/models/entity-model'
import {InvoiceModel} from 'src/app/models/invoice-model'
import {ConfirmDialogService} from 'src/app/services/confirm-dialog.service'
import {InvoicesService} from 'src/app/services/invoices.service'
import {LogService} from 'src/app/services/log.service'
import {SettingsService} from 'src/app/services/settings.service'
import {InvoicesEditComponent} from '../invoices-edit/invoices-edit.component'

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css'],
})
export class InvoicesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'accountNo',
    'client',
    'netAmount',
    'discountAmount',
    'taxAmount',
    'grossAmount',
    'btnPdf',
    'btnUpdate',
    'btnDelete',
  ]
  dataSource = new MatTableDataSource<InvoiceModel>()
  dataSource$: Subscription
  invoiceId: string
  loading = true
  type = InvoiceType.INVOICE
  types = InvoiceType
  @ViewChild('outlet') outlet: RouterOutlet

  constructor(
    private invoicesService: InvoicesService,
    private settingsService: SettingsService,
    private log: LogService,
    private confirmDialog: ConfirmDialogService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe,
    route: ActivatedRoute
  ) {
    const type = route.snapshot.data?.type
    if (type != null) {
      this.type = type
    } else {
      this.type = InvoiceType.INVOICE
    }
  }

  ngOnInit() {
    this.invoicesService
      .read(InvoiceModel, (ref) =>
        ref.where('type', '==', this.type).orderBy('accNo', 'desc')
      )
      .then((dataSource$) => {
        this.dataSource$ = dataSource$.subscribe((data) => {
          this.dataSource.data = data
          this.loading = false
        })
      })
  }

  ngOnDestroy() {
    this.dataSource$?.unsubscribe()
  }

  onInvoiceClick(invoice?: EntityModel): void {
    this.dialog.open(InvoicesEditComponent, {
      width: '800px',
      disableClose: true,
      data: {
        invoice,
        type: this.type,
      },
    })
  }

  async onPdfClick(invoice: InvoiceModel) {
    try {
      if (invoice.pdfGenerating) {
        return
      }
      invoice.pdfGenerating = true
      this.snackBar.open('Generiram PDF datoteko')
      const pdf = createPdfInvoice({
        settings: await this.settingsService.read(),
        invoice,
        datePipe: this.datePipe,
        decimalPipe: this.decimalPipe,
      })
      pdf.download(invoice.accNo, () => {
        this.snackBar.open('Prenašam PDF datoteko')
      })
    } catch (error) {
      console.error(error)
    } finally {
      invoice.pdfGenerating = false
    }
  }

  async onDeleteClick(invoice: InvoiceModel): Promise<void> {
    try {
      let typeText = ''
      if (invoice.type === InvoiceType.INVOICE) {
        typeText = 'računov'
      } else if (invoice.type === InvoiceType.OFFER) {
        typeText = 'ponudb'
      } else if (invoice.type === InvoiceType.PRE) {
        typeText = 'predračunov'
      }
      const result = await this.confirmDialog.present(
        `*** POZOR *** Že potrjenih ${typeText} se praviloma NE SME brisati. Vseeno izbrišem?`
      )
      if (result) {
        await this.invoicesService.delete(invoice)
        this.snackBar.open(`Izbrisano`)
      }
    } catch (error) {
      this.log.error(error)
      this.snackBar.open('Sistemska napaka')
    }
  }
}
