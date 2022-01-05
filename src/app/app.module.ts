import { DatePipe, DecimalPipe, registerLocaleData } from "@angular/common";
import localeSl from "@angular/common/locales/sl";
import { LOCALE_ID, NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from "@angular/material/snack-bar";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthComponent } from "./components/auth/auth.component";
import { BlankComponent } from "./components/blank/blank.component";
import { ClientsEditComponent } from "./components/clients-edit/clients-edit.component";
import { ClientsComponent } from "./components/clients/clients.component";
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { EmployeesEditComponent } from "./components/employees-edit/employees-edit.component";
import { EmployeesComponent } from "./components/employees/employees.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { HeaderComponent } from "./components/header/header.component";
import { InvoicesEditComponent } from "./components/invoices-edit/invoices-edit.component";
import { InvoicesComponent } from "./components/invoices/invoices.component";
import { ItemsEditComponent } from "./components/items-edit/items-edit.component";
import { ItemsComponent } from "./components/items/items.component";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { MembersComponent } from "./components/members/members.component";
import { MissingSettingsComponent } from "./components/missing-settings/missing-settings.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { NotesEditComponent } from "./components/notes-edit/notes-edit.component";
import { NotesSelectComponent } from "./components/notes-select/notes-select.component";
import { NotesComponent } from "./components/notes/notes.component";
import { PaymentsEditComponent } from "./components/payments-edit/payments-edit.component";
import { PaymentsComponent } from "./components/payments/payments.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { SignInWithEmailVerifyComponent } from "./components/sign-in-with-email-verify/sign-in-with-email-verify.component";
import { SignInWithEmailComponent } from "./components/sign-in-with-email/sign-in-with-email.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { TermsComponent } from "./components/terms/terms.component";
import { YearDiffWarningComponent } from "./components/year-diff-warning/year-diff-warning.component";
import { BicValidatorDirective } from "./directives/bic-validator.directive";
import { IbanValidatorDirective } from "./directives/iban-validator.directive";
import { SettingsService } from "./services/settings.service";

registerLocaleData(localeSl);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MembersComponent,
    ClientsComponent,
    ClientsEditComponent,
    SettingsComponent,
    ItemsComponent,
    ItemsEditComponent,
    NotesComponent,
    NotesEditComponent,
    InvoicesComponent,
    InvoicesEditComponent,
    LandingPageComponent,
    HeaderComponent,
    ConfirmDialogComponent,
    IbanValidatorDirective,
    BicValidatorDirective,
    BlankComponent,
    EmployeesComponent,
    EmployeesEditComponent,
    NotFoundComponent,
    NotesSelectComponent,
    AuthComponent,
    SignInComponent,
    TermsComponent,
    SignInWithEmailComponent,
    SignInWithEmailVerifyComponent,
    ForgotPasswordComponent,
    MissingSettingsComponent,
    PaymentsComponent,
    PaymentsEditComponent,
    YearDiffWarningComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatMenuModule,
    MatExpansionModule,
    MatTooltipModule,
    MatListModule,
    MatRadioModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: "registerWhenStable:30000",
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [
    DatePipe,
    DecimalPipe,
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2000,
      },
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        floatLabel: "always",
        appearance: "outline",
      },
    },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: LOCALE_ID, useValue: "sl-SI" },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(settingsService: SettingsService) {
    if (!environment.production) {
      (window as any).createDummyUser = async () => {
        const settings = await settingsService.read();
        if (!settings.id) {
          settings.firstName = "John";
          settings.lastName = "Smith";
          settings.company.name = "Hohn Smith s.p.";
          settings.company.address = "Grey Street 9";
          settings.company.postalCode = "4000";
          settings.company.postalOffice = "Mini";
          settings.company.country = "Venus";
          settings.company.taxId = "00112233";
          settings.company.bankTRR = "DE33 0000 0000 0000 0000 11";
          settings.company.bankName = "The First Bank";
          settings.company.bankBIC = "ABC";
          await settingsService.update(settings);
        }
      };
    }
  }
}
