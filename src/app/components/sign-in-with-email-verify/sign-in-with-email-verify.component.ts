import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { SystemService } from "src/app/services/system.service";

@Component({
  selector: "app-sign-in-with-email-verify",
  templateUrl: "./sign-in-with-email-verify.component.html",
  styleUrls: ["./sign-in-with-email-verify.component.css"],
})
export class SignInWithEmailVerifyComponent implements OnInit {
  loading = true;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private system: SystemService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const user = await this.system.getCurrentUser();
      if (user) {
        if (user.emailVerified) {
          await this.router.navigateByUrl("/dashboard");
        }
      } else {
        this.snackBar.open("Uporabnik ni prijavljen.");
      }
    } catch (error) {
      this.snackBar.open(`Sistemska napaka. ${error}`);
      await this.router.navigateByUrl("/");
    } finally {
      this.loading = false;
    }
  }

  async resend(): Promise<void> {
    const user = await this.system.getCurrentUser();
    if (user) {
      if (!user.emailVerified) {
        await user.sendEmailVerification();
      }
    } else {
      this.snackBar.open("Uporabnik ni prijavljen.");
    }
  }
}
