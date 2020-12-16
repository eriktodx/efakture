import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { SettingsService } from 'src/app/services/settings.service'
import { SystemService } from 'src/app/services/system.service'

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.css']
})
export class BlankComponent implements OnInit {

  constructor(
  ) { }

  async ngOnInit(): Promise<void> {

  }

}
