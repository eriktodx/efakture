import {Component, OnInit} from '@angular/core'
import {AngularFireAuth} from '@angular/fire/auth'
import {Router} from '@angular/router'
import {SettingsService} from 'src/app/services/settings.service'
import {SystemService} from 'src/app/services/system.service'
import firebase from 'firebase'
import User = firebase.User

@Component({
  selector: 'app-missing-settings',
  templateUrl: './missing-settings.component.html',
  styleUrls: ['./missing-settings.component.css']
})
export class MissingSettingsComponent implements OnInit {
  user: User
  ready = false

  constructor(
    private system: SystemService,
    private settings: SettingsService,
    private router: Router,
    private auth: AngularFireAuth
  ) {
  }

  async ngOnInit(): Promise<void> {
    try {
      const user = this.user = await this.system.getCurrentUser()
      if (user != null) {
        const settingsExist = await this.settings.exist()
        if (!settingsExist) {
          this.ready = true
        } else {
          await this.router.navigateByUrl('/dashboard')
        }
      } else {
        await this.router.navigateByUrl('/')
      }
    } catch (error) {
      await this.router.navigateByUrl('/')
    }
  }

  async onSignOutClick() {
    try {
      await this.auth.signOut()
    } finally {
      await this.router.navigateByUrl('/')
    }
  }

}
