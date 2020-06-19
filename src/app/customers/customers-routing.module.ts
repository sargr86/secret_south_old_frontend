import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ShowCustomersComponent} from './show-customers/show-customers.component';
import {EditProfileComponent} from '@shared/components/edit-profile/edit-profile.component';
import {UserResolverService} from '@core/resolvers/user-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'show'
  },
  {
    path: 'show',
    component: ShowCustomersComponent
  },
  {
    path: 'dashboard/show',
    component: DashboardComponent
  },
  {
    path: 'dashboard/edit',
    component: EditProfileComponent,
    resolve: {
      user: UserResolverService
    },
  },
  {
    path: 'orders',
    loadChildren: '../orders/orders.module#OrdersModule'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule {
}
