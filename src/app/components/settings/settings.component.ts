import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core'
import { NgForm } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { SettingsModel } from 'src/app/models/settings-model'
import { SettingsService } from 'src/app/services/settings.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  @ViewChild('form') form: NgForm
  data: SettingsModel = null
  loading = true
  private saving = false
  @Input() forced = false

  constructor(
    private settingsService: SettingsService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) dialogData: any,
    private router: Router,
    private dialogRef: MatDialogRef<SettingsComponent>
  ) {
    this.forced = dialogData.forced
  }

  async ngOnInit() {
    try {
      this.data = await this.settingsService.read()
    } finally {
      this.loading = false
    }
  }

  async onFormSubmit() {
    if (this.form.invalid) {
      this.snackBar.open(`Obrazec vsebuje napake`)
      return
    }

    try {
      if (this.saving) return
      this.saving = true
      await this.settingsService.update(this.data)
      this.snackBar.open('Shranjeno')
      if (this.forced) {
        this.router.navigateByUrl('/dashboard')
        this.dialogRef.close()
      }
    } catch (error) {
      this.snackBar.open('Sistemska napaka')
    } finally {
      this.saving = false
    }
  }
}
