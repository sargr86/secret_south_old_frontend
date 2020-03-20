import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GpsLocationComponent} from './gps-location/gps-location.component';
import {EditProfileComponent} from '@shared/components/edit-profile/edit-profile.component';
import {UserResolverService} from '@core/resolvers/user-resolver.service';
import {DashboardComponent} from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path: 'dashboard/show', component: DashboardComponent, data: {
      title: 'Dashboard',
    },
  },
  {
    path: 'dashboard/edit', component: EditProfileComponent, data: {
      title: 'Edit profile',
    },
    resolve: {
      user: UserResolverService
    },
  },
  {
    path: 'employees',
    loadChildren: '../employees/employees.module#EmployeesModule',
  },
  {
    path: 'customers',
    loadChildren: '../customers/customers.module#CustomersModule',
  },
  {
    path: 'ferries',
    loadChildren: '../ferries/ferries.module#FerriesModule',
  },
  {
    path: 'tours',
    loadChildren: '../tours/tours.module#ToursModule',
  },
  {
    path: 'food-drink',
    loadChildren: '../food-drink/food-drink.module#FoodDrinkModule',
  },
  {
    path: 'partners',
    loadChildren: '../partners/partners.module#PartnersModule',
  },
  {
    path: 'contacts',
    loadChildren: '../contacts/contacts.module#ContactsModule',
  },
  {
    path: 'companies',
    loadChildren: '../companies/companies.module#CompaniesModule'
  },
  {
    path: 'accommodations',
    loadChildren: '../accommodation/accommodation.module#AccommodationModule',
  },
  {
    path: 'orders',
    loadChildren: '../orders/orders.module#OrdersModule'
  },

  {
    path: 'activities',
    loadChildren: '../activities/activities.module#ActivitiesModule',
  },
  {
    path: 'jobs',
    loadChildren: '../jobs/jobs.module#JobsModule',
  },
  {
    path: 'add_locations', component: GpsLocationComponent,
    data: {
      title: 'Add GPS locations',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
