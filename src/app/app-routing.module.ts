import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {NotFoundComponent} from '@core/components/not-found/not-found.component';
import {AuthGuard} from '@core/guards/auth.guard';
import {RoleGuard} from '@core/guards/role.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    data: {
      expectedRole: 'admin'
    },
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    redirectTo: 'ferries',
    pathMatch: 'full'
  },
  {
    path: 'accommodations',
    loadChildren: () => import('./accommodation/accommodation.module').then(m => m.AccommodationModule),
  },
  {
    path: 'activities',
    loadChildren: () => import('./activities/activities.module').then(m => m.ActivitiesModule),
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule),
  },
  {
    path: 'food-drink',
    loadChildren: () => import('./food-drink/food-drink.module').then(m => m.FoodDrinkModule),
  },
  {
    path: 'ferries',
    loadChildren: () => import('./ferries/ferries.module').then(m => m.FerriesModule),
  },
  {
    path: 'tours',
    loadChildren: () => import('./tours/tours.module').then(m => m.ToursModule),
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'partners',
    data: {
      expectedRole: 'partner'
    },
    canActivate: [AuthGuard, RoleGuard],
    loadChildren: () => import('./partners/partners.module').then(m => m.PartnersModule),
  },
  {
    path: 'employees',
    canActivate: [AuthGuard],
    loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule),
  },
  {
    path: 'customers',
    canActivate: [AuthGuard],
    loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
