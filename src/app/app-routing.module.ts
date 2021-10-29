import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./components/auth/auth.component";
import { BlankComponent } from "./components/blank/blank.component";
import { ClientsComponent } from "./components/clients/clients.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { EmployeesComponent } from "./components/employees/employees.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { InvoicesComponent } from "./components/invoices/invoices.component";
import { ItemsComponent } from "./components/items/items.component";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { MembersComponent } from "./components/members/members.component";
import { MissingSettingsComponent } from "./components/missing-settings/missing-settings.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { NotesComponent } from "./components/notes/notes.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { SignInWithEmailVerifyComponent } from "./components/sign-in-with-email-verify/sign-in-with-email-verify.component";
import { SignInWithEmailComponent } from "./components/sign-in-with-email/sign-in-with-email.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { TermsComponent } from "./components/terms/terms.component";
import { InvoiceType } from "./enums/invoice-type.enum";
import { AppInitGuard } from "./guards/app-init.guard";
import { SettingsRequiredGuard } from "./guards/settings-required.guard";
import { UserRequiredGuard } from "./guards/user-required.guard";

const routes: Routes = [
  {
    path: "",
    canActivate: [AppInitGuard],
    children: [
      {
        path: "",
        component: LandingPageComponent,
      },
      {
        path: "blank",
        component: BlankComponent,
      },
      {
        path: "",
        component: AuthComponent,
        children: [
          {
            path: "sign-in",
            component: SignInComponent
          },
          {
            path: "sign-in/email",
            component: SignInWithEmailComponent
          },
          {
            path: "sign-up",
            component: SignInComponent,
            data: { signUp: true }
          },
          {
            path: "sign-up/email",
            component: SignInWithEmailComponent,
            data: { signUp: true }
          },
          {
            path: "sign-up/email/verify",
            component: SignInWithEmailVerifyComponent
          },
          {
            path: "forgot-password",
            component: ForgotPasswordComponent
          },
          {
            path: "terms",
            component: TermsComponent
          }
        ]
      },
      {
        path: "missing-settings",
        component: MissingSettingsComponent
      },
      {
        path: "",
        component: MembersComponent,
        canActivate: [UserRequiredGuard, SettingsRequiredGuard],
        children: [
          {
            path: "",
            pathMatch: "full",
            redirectTo: "dashboard",
          },
          {
            path: "dashboard",
            component: DashboardComponent,
          },
          {
            path: "clients",
            component: ClientsComponent,
          },
          {
            path: "items",
            component: ItemsComponent,
          },
          {
            path: "services",
            component: ItemsComponent,
            data: { services: true },
          },
          {
            path: "notes",
            component: NotesComponent,
          },
          {
            path: "invoices",
            component: InvoicesComponent,
          },
          {
            path: "offer-invoices",
            component: InvoicesComponent,
            data: { type: InvoiceType.OFFER },
          },
          {
            path: "pre-invoices",
            component: InvoicesComponent,
            data: { type: InvoiceType.PRE },
          },
          {
            path: "employees",
            component: EmployeesComponent,
          },
          {
            path: "settings",
            component: SettingsComponent,
          },
        ],
      },
      {
        path: "**",
        component: NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
