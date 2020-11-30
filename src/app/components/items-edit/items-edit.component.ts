import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ItemType } from 'src/app/enums/item-type.enum';
import { ItemModel } from 'src/app/models/item-model';
import { ItemsService } from 'src/app/services/items.service';
import { LogService } from 'src/app/services/log.service';

export interface DataInterface {
  select?: boolean;
  type?: ItemType;
  item?: ItemModel;
}

@Component({
  selector: 'app-items-edit',
  templateUrl: './items-edit.component.html',
  styleUrls: ['./items-edit.component.css'],
})
export class ItemsEditComponent implements OnInit, OnDestroy {
  types = ItemType;
  itemsDataSource: ItemModel[] = [];
  itemsDataSource$: Subscription;
  @ViewChild('form') form: NgForm;

  constructor(
    private itemsService: ItemsService,
    private log: LogService,
    public dialogRef: MatDialogRef<ItemsEditComponent>,
    public afs: AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public data: DataInterface,
    private snackBar: MatSnackBar
  ) {
    if (data.item == null) {
      data.item = new ItemModel();
      data.item.type = data.type;
    } else data.item = new ItemModel(data.item);
  }

  ngOnInit() {
    if (this.data.select) {
      this.itemsService
        .read(ItemModel, (ref) => ref.orderBy('dateCreated', 'asc'))
        .then((dataSource$) => {
          this.itemsDataSource$ = dataSource$.subscribe((data) => {
            this.itemsDataSource = data;
          });
        });
    }
  }

  ngOnDestroy() {
    this.itemsDataSource$?.unsubscribe();
  }

  onItemSelectionChange(ev: MatOptionSelectionChange) {
    const item = ev.source.value;
    const id = this.data.item.id;
    this.data.item = new ItemModel(item);
    this.data.item.id = id;
  }

  onCancelClick() {
    this.dialogRef.close(false);
  }

  async onFormSubmit() {
    if (!this.form.valid) {
      this.snackBar.open(`Obrazec vsebuje napake`);
      return;
    }

    if (this.data.select) {
      return this.dialogRef.close(this.data.item.prepare());
    }

    try {
      if (!this.data.item.id) await this.itemsService.create(this.data.item);
      else await this.itemsService.update(this.data.item);
      this.snackBar.open(`Shranjeno`);
      this.dialogRef.close(true);
    } catch (error) {
      this.log.error(error);
      this.snackBar.open(`Sistemska napaka`);
    }
  }
}
