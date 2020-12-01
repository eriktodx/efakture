import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatTableDataSource } from '@angular/material/table'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { ItemType } from 'src/app/enums/item-type.enum'
import { ItemModel } from 'src/app/models/item-model'
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service'
import { ItemsService } from 'src/app/services/items.service'
import { LogService } from 'src/app/services/log.service'
import { ItemsEditComponent } from '../items-edit/items-edit.component'

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit, OnDestroy {
  displayedColumns = [
    'code',
    'name',
    'unit',
    'price',
    'btnConvert',
    'btnUpdate',
    'btnDelete',
  ]
  dataSource = new MatTableDataSource<ItemModel>([])
  dataSource$: Subscription
  type: ItemType
  types = ItemType
  loading = true
  convertText = 'Pretvori v storitev'

  constructor(
    private itemsService: ItemsService,
    private log: LogService,
    private dialog: MatDialog,
    route: ActivatedRoute,
    private confirmDialog: ConfirmDialogService,
    private snackBar: MatSnackBar
  ) {
    this.type = route.snapshot.data?.services
      ? ItemType.SERVICE
      : ItemType.ITEM
    if (this.type === ItemType.SERVICE) {
      this.convertText = 'Pretvori v izdelek'
    }
  }

  ngOnInit(): void {
    this.itemsService
      .read(ItemModel, (ref) =>
        ref.where(`type`, `==`, this.type).orderBy('dateCreated', 'asc')
      )
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

  onItemClick(item?: ItemModel): void {
    this.dialog.open(ItemsEditComponent, {
      width: '480px',
      data: {
        item,
        type: this.type,
      },
    })
  }

  async onConvertClick(item: ItemModel): Promise<void> {
    try {
      let message: string
      let type: ItemType

      if (this.type === ItemType.SERVICE) {
        message = `Ste prepričani, da želite storitev pretvoriti v izdelek?`
        type = ItemType.ITEM
      } else {
        message = `Ste prepričani, da želite izdelek pretvoriti v storitev?`
        type = ItemType.SERVICE
      }

      const result = await this.confirmDialog.present(message)
      if (result) {
        item.type = type
        await this.itemsService.update(item)
        this.snackBar.open(`Pretvorjeno`)
      }
    } catch (error) {
      this.log.error(error)
      this.snackBar.open('Sistemska napaka')
    }
  }

  async onDeleteClick(item: ItemModel): Promise<void> {
    try {
      const result = await this.confirmDialog.present(
        `Ste prepričani, da želite izbrisati izbran zapis?`
      )
      if (result) {
        await this.itemsService.delete(item)
        this.snackBar.open(`Izbrisano`)
      }
    } catch (error) {
      this.log.error(error)
      this.snackBar.open('Sistemska napaka')
    }
  }
}
