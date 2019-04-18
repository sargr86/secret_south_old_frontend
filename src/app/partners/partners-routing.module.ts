import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PartnerDashboardComponent} from './partner-dashboard/partner-dashboard.component';
import {LoginComponent} from '../shared/components/login/login.component';


const routes: Routes = [
    {
        path: 'login', component: LoginComponent, data: {
            user: 'partner'
        }
    },
    {path: 'dashboardPage', component: PartnerDashboardComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PartnersRoutingModule {
}
