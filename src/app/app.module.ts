import {DatePipe, DecimalPipe} from '@angular/common'
import {NgModule} from '@angular/core'
import {AngularFireModule} from '@angular/fire'
import {AngularFireAnalyticsModule} from '@angular/fire/analytics'
import {AngularFireAuthModule} from '@angular/fire/auth'
import {AngularFirestoreModule} from '@angular/fire/firestore'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatButtonModule} from '@angular/material/button'
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatNativeDateModule} from '@angular/material/core'
import {MatDatepickerModule} from '@angular/material/datepicker'
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog'
import {MatExpansionModule} from '@angular/material/expansion'
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS
} from '@angular/material/form-field'
import {MatIconModule} from '@angular/material/icon'
import {MatInputModule} from '@angular/material/input'
import {MatListModule} from '@angular/material/list'
import {MatMenuModule} from '@angular/material/menu'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatSelectModule} from '@angular/material/select'
import {MatSidenavModule} from '@angular/material/sidenav'
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS
} from '@angular/material/snack-bar'
import {MatStepperModule} from '@angular/material/stepper'
import {MatTableModule} from '@angular/material/table'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatTooltipModule} from '@angular/material/tooltip'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {environment} from '../environments/environment'
import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {AuthComponent} from './components/auth/auth.component'
import {BlankComponent} from './components/blank/blank.component'
import {ClientsEditComponent} from './components/clients-edit/clients-edit.component'
import {ClientsComponent} from './components/clients/clients.component'
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component'
import {DashboardComponent} from './components/dashboard/dashboard.component'
import {EmployeesEditComponent} from './components/employees-edit/employees-edit.component'
import {EmployeesComponent} from './components/employees/employees.component'
import {HeaderComponent} from './components/header/header.component'
import {InvoicesEditComponent} from './components/invoices-edit/invoices-edit.component'
import {InvoicesComponent} from './components/invoices/invoices.component'
import {ItemsEditComponent} from './components/items-edit/items-edit.component'
import {ItemsComponent} from './components/items/items.component'
import {LandingPageComponent} from './components/landing-page/landing-page.component'
import {MembersComponent} from './components/members/members.component'
import {NotFoundComponent} from './components/not-found/not-found.component'
import {NotesEditComponent} from './components/notes-edit/notes-edit.component'
import {NotesSelectComponent} from './components/notes-select/notes-select.component'
import {NotesComponent} from './components/notes/notes.component'
import {SettingsComponent} from './components/settings/settings.component'
import {SignInWithEmailComponent} from './components/sign-in-with-email/sign-in-with-email.component'
import {SignInComponent} from './components/sign-in/sign-in.component'
import {TermsComponent} from './components/terms/terms.component'
import {BicValidatorDirective} from './directives/bic-validator.directive'
import {IbanValidatorDirective} from './directives/iban-validator.directive'
import {SignInWithEmailVerifyComponent} from './components/sign-in-with-email-verify/sign-in-with-email-verify.component'
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component'
import {MissingSettingsComponent} from './components/missing-settings/missing-settings.component'

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireAnalyticsModule,
    AppRoutingModule,
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
    MatListModule
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
        floatLabel: 'always',
        appearance: 'outline',
      },
    },
    {provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: MatDialogRef, useValue: {}},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
