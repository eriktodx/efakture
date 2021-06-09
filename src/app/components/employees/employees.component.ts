import {Component, OnDestroy, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material/dialog'
import {MatSnackBar} from '@angular/material/snack-bar'
import {MatTableDataSource} from '@angular/material/table'
import {Subscription} from 'rxjs'
import {EmployeeModel} from 'src/app/models/employee-model'
import {ConfirmDialogService} from 'src/app/services/confirm-dialog.service'
import {EmployeesService} from 'src/app/services/employees.service'
import {LogService} from 'src/app/services/log.service'
import {EmployeesEditComponent} from '../employees-edit/employees-edit.component'

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit, OnDestroy {
  private dataSource$: Subscription
  dataSource = new MatTableDataSource<EmployeeModel>([])
  displayedColumns = ['name', 'edit', 'delete']
  loading = true

  constructor(
    private employees: EmployeesService,
    private dialog: MatDialog,
    private confirmDialog: ConfirmDialogService,
    private snackBar: MatSnackBar,
    private log: LogService
  ) {
  }

  ngOnInit(): void {
    this.employees
      .read(EmployeeModel, (ref) => ref.orderBy('dateCreated', 'asc'))
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

  onEmployeeClick(employee?: EmployeeModel): void {
    this.dialog.open(EmployeesEditComponent, {
      width: '480px',
      data: {employee},
    })
  }

  async onDeleteClick(client: EmployeeModel): Promise<void> {
    try {
      const result = await this.confirmDialog.present(
        `Ste prepričani, da želite izbrisati izbran zapis?`
      )
      if (result) {
        await this.employees.delete(client)
        this.snackBar.open(`Izbrisano`)
      }
    } catch (error) {
      this.log.error(error)
      this.snackBar.open('Sistemska napaka')
    }
  }
}
