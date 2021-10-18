import {Component, OnInit} from '@angular/core'
import {SystemService} from 'src/app/services/system.service'
import {environment} from 'src/environments/environment'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  loading = true
  continueUrl = '/sign-in'

  get version() {
    return environment.version
  }

  constructor(
    private system: SystemService
  ) {
  }

  async ngOnInit() {
    let user: any = null
    try {
      user = await this.system.getCurrentUser()
    } catch (error) {
      console.error(error)
    } finally {
      this.loading = false
      this.continueUrl = user != null
        ? '/dashboard'
        : '/sign-in'
    }
  }
}
