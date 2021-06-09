import {Component, OnInit} from '@angular/core'
import {AngularFireAuth} from '@angular/fire/auth'
import {Router} from '@angular/router'
import {LogService} from 'src/app/services/log.service'

@Component({
  selector: 'app-sign-in-with-email-verify',
  templateUrl: './sign-in-with-email-verify.component.html',
  styleUrls: ['./sign-in-with-email-verify.component.css']
})
export class SignInWithEmailVerifyComponent implements OnInit {
  loading = true

  constructor(
    private log: LogService,
    private router: Router,
    private auth: AngularFireAuth
  ) {
  }

  async ngOnInit(): Promise<void> {

    try {
      const user = await this.auth.currentUser
      if (user.emailVerified) {
        await this.router.navigateByUrl('/dashboard')
      }
    } catch (error) {
      this.log.error(error)
      await this.router.navigateByUrl('/')
    } finally {
      this.loading = false
    }
  }

  async resend(): Promise<void> {
    const user = await this.auth.currentUser
    if (!user.emailVerified) {
      await user.sendEmailVerification()
    }
  }
}
