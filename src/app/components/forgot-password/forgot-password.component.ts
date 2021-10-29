import { Component, ViewChild } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { NgForm } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"],
})
export class ForgotPasswordComponent {
  @ViewChild("form") form!: NgForm;
  submitted = false;
  emailVal = "";

  constructor(
    private snackBar: MatSnackBar,
    private auth: AngularFireAuth
  ) { }

  async onFormSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.snackBar.open("Obrazec vsebuje napake");
      return;
    }

    this.submitted = true;

    try {
      await this.auth.sendPasswordResetEmail(this.emailVal);
    } catch (error) {
      this.snackBar.open(`Sistemska napaka. ${error}`);
    }
  }
}
