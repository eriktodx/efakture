import {Component, OnInit, ViewChild} from '@angular/core'
import {AngularFireAuth} from '@angular/fire/auth'
import {NgForm} from '@angular/forms'
import {MatSnackBar} from '@angular/material/snack-bar'
import {ActivatedRoute, Router} from '@angular/router'
import {LogService} from 'src/app/services/log.service'

@Component({
  selector: 'app-sign-in-with-email',
  templateUrl: './sign-in-with-email.component.html',
  styleUrls: ['./sign-in-with-email.component.css']
})
export class SignInWithEmailComponent implements OnInit {
  @ViewChild('form') form: NgForm
  emailVal = ''
  passwordVal = ''
  passwordRepeatVal = ''
  errorText = ''
  errored = false
  signUp = false
  saving = false
  signInText = ''

  constructor(
    private snackBar: MatSnackBar,
    private auth: AngularFireAuth,
    private router: Router,
    private log: LogService,
    private route: ActivatedRoute
  ) {
    this.signUp = this.route.snapshot.data.signUp
    this.signInText = this.signUp ? 'Registracija' : 'Prijava'
  }

  ngOnInit(): void {
    //
  }

  async onFormSubmit(): Promise<void> {
    if (this.saving) {
      return
    }

    try {
      this.saving = true

      if (this.form.invalid) {
        this.snackBar.open(`Obrazec vsebuje napake`)
        return
      }

      if (this.signUp) {
        const result = await this.auth.createUserWithEmailAndPassword(this.emailVal, this.passwordVal)
        await result.user.sendEmailVerification()
        await this.router.navigateByUrl('/sign-up/email/verify')
      } else {
        const result = await this.auth.signInWithEmailAndPassword(this.emailVal, this.passwordVal)
        if (!result.user.emailVerified) {
          await this.router.navigateByUrl('/sign-up/email/verify')
        } else {
          await this.router.navigateByUrl('/dashboard')
        }
      }

      this.errored = false
    } catch (error) {
      this.log.error(error)
      this.errored = true

      if (error.code === 'auth/weak-password') {
        this.errorText = 'Geslo mora vsebovati vsaj 6 znakov.'
      } else {
        this.errorText = 'Napačen email in/ali geslo.'
      }
    } finally {
      this.saving = false
    }
  }
}
