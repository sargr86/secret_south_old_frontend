import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from '../shared/components/login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';


const routes: Routes = [
    {
        path: 'login', component: LoginComponent, data: {
            user: 'partner'
        }
    },
    {path: 'dashboard', component: DashboardComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PartnersRoutingModule {
}
