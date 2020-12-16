import { NgModule } from '@angular/core'
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthGuard } from '@angular/fire/auth-guard'
import { RouterModule, Routes } from '@angular/router'
import { AuthComponent } from 'src/app/components/auth/auth.component'
import { BlankComponent } from 'src/app/components/blank/blank.component'
import { ClientsComponent } from 'src/app/components/clients/clients.component'
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component'
import { EmployeesComponent } from 'src/app/components/employees/employees.component'
import { ForgotPasswordComponent } from 'src/app/components/forgot-password/forgot-password.component'
import { InvoicesComponent } from 'src/app/components/invoices/invoices.component'
import { ItemsComponent } from 'src/app/components/items/items.component'
import { LandingPageComponent } from 'src/app/components/landing-page/landing-page.component'
import { MembersComponent } from 'src/app/components/members/members.component'
import { MissingSettingsComponent } from 'src/app/components/missing-settings/missing-settings.component'
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component'
import { NotesComponent } from 'src/app/components/notes/notes.component'
import { SettingsComponent } from 'src/app/components/settings/settings.component'
import { SignInWithEmailVerifyComponent } from 'src/app/components/sign-in-with-email-verify/sign-in-with-email-verify.component'
import { SignInWithEmailComponent } from 'src/app/components/sign-in-with-email/sign-in-with-email.component'
import { SignInComponent } from 'src/app/components/sign-in/sign-in.component'
import { TermsComponent } from 'src/app/components/terms/terms.component'
import { InvoiceType } from 'src/app/enums/invoice-type.enum'
import { SettingsRequiredGuard } from 'src/app/guards/settings-required.guard'

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'blank',
    component: BlankComponent,
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInComponent
      },
      {
        path: 'sign-in/email',
        component: SignInWithEmailComponent
      },
      {
        path: 'sign-up',
        component: SignInComponent,
        data: { signUp: true }
      },
      {
        path: 'sign-up/email',
        component: SignInWithEmailComponent,
        data: { signUp: true }
      },
      {
        path: 'sign-up/email/verify',
        component: SignInWithEmailVerifyComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'terms',
        component: TermsComponent
      }
    ]
  },
  {
    path: 'missing-settings',
    component: MissingSettingsComponent
  },
  {
    path: '',
    component: MembersComponent,
    canActivate: [AngularFireAuthGuard, SettingsRequiredGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'clients',
        component: ClientsComponent,
      },
      {
        path: 'items',
        component: ItemsComponent,
      },
      {
        path: 'services',
        component: ItemsComponent,
        data: { services: true },
      },
      {
        path: 'notes',
        component: NotesComponent,
      },
      {
        path: 'invoices',
        component: InvoicesComponent,
      },
      {
        path: 'offer-invoices',
        component: InvoicesComponent,
        data: { type: InvoiceType.OFFER },
      },
      {
        path: 'pre-invoices',
        component: InvoicesComponent,
        data: { type: InvoiceType.PRE },
      },
      {
        path: 'employees',
        component: EmployeesComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]

@NgModule({
  imports: [AngularFireModule, RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
