import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GpsLocationComponent} from './gps-location/gps-location.component';
import {EditProfileComponent} from '@shared/components/edit-profile/edit-profile.component';
import {UserResolverService} from '@core/resolvers/user-resolver.service';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from '@core/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/show'
  },
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
    path: 'accommodations',
    loadChildren: () => import('../accommodation/accommodation.module').then(m => m.AccommodationModule)
  },
  {
    path: 'activities',
    loadChildren: () => import('../activities/activities.module').then(m => m.ActivitiesModule)
  },
  {
    path: 'food-drink',
    loadChildren: () => import('../food-drink/food-drink.module').then(m => m.FoodDrinkModule)
  },
  {
    path: 'ferries',
    loadChildren: () => import('../ferries/ferries.module').then(m => m.FerriesModule)
  },
  {
    path: 'tours',
    loadChildren: () => import('../tours/tours.module').then(m => m.ToursModule)
  },
  {
    path: 'employees',
    canActivate: [AuthGuard],
    loadChildren: () => import('../employees/employees.module').then(m => m.EmployeesModule)
  },
  {
    path: 'customers',
    canActivate: [AuthGuard],
    loadChildren: () => import('../customers/customers.module').then(m => m.CustomersModule)
  },
  {
    path: 'partners',
    loadChildren: () => import('../partners/partners.module').then(m => m.PartnersModule)
  },

  {
    path: 'contacts',
    loadChildren: () => import('../contacts/contacts.module').then(m => m.ContactsModule)
  },
  {
    path: 'companies',
    loadChildren: () => import('../companies/companies.module').then(m => m.CompaniesModule)
  },
  {
    path: 'jobs',
    loadChildren: () => import('../jobs/jobs.module').then(m => m.JobsModule),
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
