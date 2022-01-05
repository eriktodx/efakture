import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { SettingsService } from "src/app/services/settings.service";

@Component({
  selector: "app-year-diff-warning",
  templateUrl: "./year-diff-warning.component.html",
  styleUrls: ["./year-diff-warning.component.scss"],
})
export class YearDiffWarningComponent implements OnInit, OnDestroy {
  private settingsSub!: Subscription;
  accountingYear = "-";
  currentYear = "-";

  constructor(private settingsService: SettingsService) {}

  get visible() {
    return (
      this.accountingYear !== "-" &&
      this.currentYear !== "-" &&
      this.accountingYear !== this.currentYear
    );
  }

  ngOnInit() {
    this.settingsService.observe().then((settings$) => {
      this.settingsSub = settings$.subscribe((settings) => {
        this.accountingYear = String(settings.accounting.year);
        this.currentYear = String(new Date().getFullYear());
      });
    });
  }

  ngOnDestroy() {
    if (this.settingsSub && !this.settingsSub.closed) {
      this.settingsSub.unsubscribe();
    }
  }
}
