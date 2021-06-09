import {Component, OnInit, ViewChild} from '@angular/core'
import {AngularFireAuth} from '@angular/fire/auth'
import {NgForm} from '@angular/forms'
import {MatSnackBar} from '@angular/material/snack-bar'
import {LogService} from 'src/app/services/log.service'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild('form') form: NgForm
  submitted = false
  emailVal = ''

  constructor(
    private snackBar: MatSnackBar,
    private log: LogService,
    private auth: AngularFireAuth
  ) {
  }

  ngOnInit(): void {
  }

  async onFormSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.snackBar.open(`Obrazec vsebuje napake`)
      return
    }

    this.submitted = true

    try {
      await this.auth.sendPasswordResetEmail(this.emailVal)
    } catch (error) {
      this.log.error(error)
    }
  }

}
