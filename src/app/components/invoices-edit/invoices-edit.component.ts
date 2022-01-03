import { Component, Inject, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatOptionSelectionChange } from "@angular/material/core";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { MatSelect } from "@angular/material/select";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { EntityType } from "src/app/enums/entity-type.enum";
import { InvoiceType } from "src/app/enums/invoice-type.enum";
import { ItemType } from "src/app/enums/item-type.enum";
import { NoteType } from "src/app/enums/note-type.enum";
import { calculateInvoiceSums } from "src/app/functions/calculate-invoice-sums";
import { nextAccountNumber } from "src/app/functions/next-account-number";
import { EntityModel } from "src/app/models/entity-model";
import { InvoiceModel } from "src/app/models/invoice-model";
import { ItemModel } from "src/app/models/item-model";
import { NoteModel } from "src/app/models/note-model";
import { ClientsService } from "src/app/services/clients.service";
import { ConfirmDialogService } from "src/app/services/confirm-dialog.service";
import { InvoicesService } from "src/app/services/invoices.service";
import { SettingsService } from "src/app/services/settings.service";
import { ItemsEditComponent } from "../items-edit/items-edit.component";
import { NotesSelectComponent } from "../notes-select/notes-select.component";

export interface DialogData {
  invoice: InvoiceModel;
  type: InvoiceType;
}

@Component({
  selector: "app-invoices-edit",
  templateUrl: "./invoices-edit.component.html",
  styleUrls: ["./invoices-edit.component.css"],
})
export class InvoicesEditComponent implements OnInit, OnDestroy {
  @ViewChild("form") form!: NgForm;
  @ViewChild("clientSelect") clientSelect!: MatSelect;
  displayedColumns: string[] = [
    "type",
    "code",
    "name",
    "price",
    "discount",
    "tax",
    "gross",
    "btnUpdate",
    "btnDelete",
  ];
  data!: InvoiceModel;
  clientsDataSource!: EntityModel[];
  clientsDataSource$!: Subscription;
  itemsDataSource = new MatTableDataSource<ItemModel>([]);
  itemTypes = ItemType;
  entityTypes = EntityType;
  type: InvoiceType;
  types = InvoiceType;
  noteTypes = NoteType;

  constructor(
    private invoicesService: InvoicesService,
    private clientsService: ClientsService,
    private dialog: MatDialog,
    private confirmDialog: ConfirmDialogService,
    private settingsService: SettingsService,
    private dialogRef: MatDialogRef<InvoicesEditComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: DialogData,
    private snackBar: MatSnackBar
  ) {
    const type = dialogData.type;
    if (type != null) {
      this.type = type;
    } else {
      this.type = InvoiceType.INVOICE;
    }
  }

  ngOnInit() {
    if (!this.dialogData.invoice) {
      this.settingsService.read().then((settings) => {
        const data = new InvoiceModel();
        data.type = this.type;
        data.company = new EntityModel(settings.company);
        data.client = new EntityModel();
        data.validFrom = new Date();
        data.validTo = new Date(data.validFrom);
        data.validTo.setDate(data.validTo.getDate() + 8);
        data.authorName = `${settings.firstName} ${settings.lastName}`;
        data.authorLocation = settings.company.postalOffice;
        data.accNo = nextAccountNumber(settings, data.type);
        this.data = data;
      });
    } else {
      this.data = new InvoiceModel(this.dialogData.invoice);
      this.itemsDataSource.data = this.data.items;
      calculateInvoiceSums(this.data);
    }

    this.clientsService.read(EntityModel).then((dataSource$) => {
      this.clientsDataSource$ = dataSource$.subscribe((data) => {
        this.clientsDataSource = data;
      });
    });
  }

  ngOnDestroy() {
    this.clientsDataSource$?.unsubscribe();
  }

  onUpdateCompanyClick(ev: MouseEvent) {
    ev.preventDefault();
    this.settingsService.read().then((settings) => {
      this.data.company = new EntityModel(settings.company);
      this.snackBar.open("Podatki izdajatelja uspešno posodobljeni.");
    });
  }

  onClientSelectionChange(ev: MatOptionSelectionChange) {
    Object.assign(this.data.client, ev.source.value);
  }

  onClearClientClick(ev: MouseEvent) {
    ev.preventDefault();
    this.clientSelect.value = null;
    this.data.client = new EntityModel();
  }

  private openItemDialog(item?: ItemModel) {
    const ref = this.dialog.open(ItemsEditComponent, {
      width: "480px",
      data: {
        select: true,
        item,
        type: ItemType.SERVICE,
      },
    });
    ref.afterClosed().subscribe((newItem) => {
      if (newItem) {
        if (item) {
          this.data.items.splice(this.data.items.indexOf(item), 1, newItem);
        } else {
          this.data.items.push(newItem);
        }
        this.itemsDataSource.data = this.data.items;
        calculateInvoiceSums(this.data);
      }
    });
  }

  onAddItemClick(ev: MouseEvent) {
    ev.preventDefault();
    this.openItemDialog();
  }

  onValidFromChanged(ev: MatDatepickerInputEvent<unknown>) {
    const date = new Date(ev.value as Date);
    date.setDate(date.getDate() + 8);
    this.data.validTo = date;
  }

  onUpdateItemClick(ev: MouseEvent, item: ItemModel) {
    ev.preventDefault();
    this.openItemDialog(item);
  }

  onDeleteItemClick(ev: MouseEvent, item: ItemModel) {
    ev.preventDefault();
    this.data.items.splice(this.data.items.indexOf(item), 1);
    this.itemsDataSource.data = this.data.items;
    calculateInvoiceSums(this.data);
  }

  onSelectMsgClick(ev: MouseEvent, type: NoteType) {
    ev.preventDefault();
    const ref = this.dialog.open(NotesSelectComponent, {
      width: "320px",
      data: { type },
    });
    ref.afterClosed().subscribe((note: NoteModel) => {
      if (note) {
        const msg = note.description;
        if (type === NoteType.HEADER) {
          this.data.headerMsg = msg;
        } else if (type === NoteType.CONTENT) {
          this.data.contentMsg = msg;
        } else if (type === NoteType.FOOTER) {
          this.data.footerMsg = msg;
        }
      }
    });
  }

  async onCancelClick() {
    const result = await this.confirmDialog.present(
      "*** POZOR *** Vaš vnos še ni shranjen! Vseeno želite preklicati?"
    );
    if (result) {
      this.dialogRef.close(false);
    }
  }

  async onFormSubmit() {
    if (this.form.invalid) {
      this.snackBar.open("Obrazec vsebuje napake");
      return;
    }

    if (this.data.items.length === 0) {
      this.snackBar.open("Vnesti morate vsaj eno postavko");
      return;
    }

    try {
      if (!this.data.id) {
        await this.invoicesService.create(this.data);
        const settings = await this.settingsService.read();
        if (this.type === InvoiceType.OFFER) {
          settings.accounting.seqOffer += 1;
        } else if (this.type === InvoiceType.PRE) {
          settings.accounting.seqPre += 1;
        } else {
          settings.accounting.seq += 1;
        }
        await this.settingsService.update(settings);
      } else {
        await this.invoicesService.update(this.data);
      }
      this.dialogRef.close(true);
    } catch (error) {
      this.snackBar.open(`Sistemska napaka. ${error}`);
    }
  }
}
