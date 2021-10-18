import {Component, OnInit} from '@angular/core'

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  website = 'fakture.kralj.dev'
  company = 'ERIK KRALJ, RAČUNALNIŠKO PROGRAMIRANJE, S.P.'
  post = 'Jesenicah'

  constructor() {
  }

  ngOnInit(): void {
  }

}
