import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ShowCustomersComponent} from './show-customers/show-customers.component';
import {EditProfileComponent} from '../shared/components/edit-profile/edit-profile.component';
import {UserResolverService} from '../shared/resolvers/user-resolver.service';

const routes: Routes = [
    {
        path: 'show',
        component: ShowCustomersComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'dashboard/edit',
        component: EditProfileComponent,
        resolve: {
            user: UserResolverService
        },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomersRoutingModule {
}
