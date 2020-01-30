import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {NotFoundComponent} from '@core/components/not-found/not-found.component';
import {AuthGuard} from '@core/guards/auth.guard';
import {RoleGuard} from '@core/guards/role.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    data: {
      expectedRole: 'admin'
    },
    canActivate: [AuthGuard, RoleGuard]
  },
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  {
    path: '',
    redirectTo: 'ferries',
    pathMatch: 'full'
  },
  {
    path: 'accommodations',
    loadChildren: './accommodation/accommodation.module#AccommodationModule'
  },
  {
    path: 'activities',
    loadChildren: './activities/activities.module#ActivitiesModule'
  },
  {
    path: 'food-drink',
    loadChildren: './food-drink/food-drink.module#FoodDrinkModule'
  },
  {
    path: 'ferries',
    loadChildren: './ferries/ferries.module#FerriesModule'
  },
  {
    path: 'tours',
    loadChildren: './tours/tours.module#ToursModule'
  },
  {path: '', loadChildren: './home/home.module#HomeModule'},
  {
    path: 'partners',
    data: {
      expectedRole: 'partner'
    },
    canActivate: [AuthGuard, RoleGuard],
    loadChildren: './partners/partners.module#PartnersModule'
  },
  {
    path: 'employees',
    canActivate: [AuthGuard],
    loadChildren: './employees/employees.module#EmployeesModule'
  },
  {
    path: 'customers',
    canActivate: [AuthGuard],
    loadChildren: './customers/customers.module#CustomersModule'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
