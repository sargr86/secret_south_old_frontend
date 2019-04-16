import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PartnerDashboardComponent} from './partner-dashboard/partner-dashboard.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'dashboardPage', component: PartnerDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnersRoutingModule { }
