import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../components/confirm-dialog/confirm-dialog.component";

@Injectable({
  providedIn: "root",
})
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {}

  present(message: string, title?: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (title == null) {
        title = "Potrditev";
      }

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: "480px",
        data: { title, message },
      });

      dialogRef.afterClosed().subscribe((dialogResult) => {
        resolve(dialogResult);
      });
    });
  }
}
