import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './components/blank/blank.component';
import { ClientsComponent } from './components/clients/clients.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { ItemsComponent } from './components/items/items.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MembersComponent } from './components/members/members.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotesComponent } from './components/notes/notes.component';
import { SettingsComponent } from './components/settings/settings.component';
import { InvoiceType } from './enums/invoice-type.enum';
import { SettingsRequiredGuard } from './guards/settings-required.guard';

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
];

@NgModule({
  imports: [AngularFireModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
