import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { EntityType } from "src/app/enums/entity-type.enum";
import { EntityModel } from "src/app/models/entity-model";
import { ClientsService } from "src/app/services/clients.service";
import { ConfirmDialogService } from "src/app/services/confirm-dialog.service";
import { ClientsEditComponent } from "../clients-edit/clients-edit.component";

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.css"],
})
export class ClientsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ["type", "name", "btnUpdate", "btnDelete"];
  dataSource = new MatTableDataSource<EntityModel>([]);
  dataSource$!: Subscription;
  types = EntityType;
  loading = true;

  constructor(
    private clientsService: ClientsService,
    private dialog: MatDialog,
    private confirmDialog: ConfirmDialogService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.clientsService
      .read(EntityModel, (ref: any) => ref.orderBy("dateCreated", "asc"))
      .then((dataSource$) => {
        this.dataSource$ = dataSource$.subscribe((data) => {
          this.dataSource.data = data;
          this.loading = false;
        });
      });
  }

  ngOnDestroy(): void {
    this.dataSource$?.unsubscribe();
  }

  onClientClick(client?: EntityModel): void {
    this.dialog.open(ClientsEditComponent, {
      width: "480px",
      data: client,
    });
  }

  async onDeleteClick(client: EntityModel): Promise<void> {
    try {
      const result = await this.confirmDialog.present(
        "Ste prepričani, da želite izbrisati izbran zapis?"
      );
      if (result) {
        await this.clientsService.delete(client);
        this.snackBar.open("Izbrisano");
      }
    } catch (error) {
      this.snackBar.open(`Sistemska napaka. ${error}`);
    }
  }
}
