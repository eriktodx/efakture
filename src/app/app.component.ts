import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private swUpdate: SwUpdate, private snackBar: MatSnackBar) {
    swUpdate.available.subscribe(async () => {
      try {
        snackBar.open('Na voljo je posodobitev. Nameščam.');
        await swUpdate.activateUpdate();
        snackBar.open(
          'Posodobitev nameščena. Aplikacija se bo v kratkem ponovno zagnala.'
        );
        document.location.reload();
      } catch (error) {
        snackBar.open(
          `Med nameščanjem posodobitve je prišlo do napake. ${error}`
        );
      }
    });
  }

  async ngOnInit() {
    try {
      if (this.swUpdate.isEnabled) {
        await this.swUpdate.checkForUpdate();
      }
    } catch (error) {
      this.snackBar.open('Med iskanjem posodobitev je prišlo do napake.');
    }
  }
}
