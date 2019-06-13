import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {RoleGuard} from './shared/guards/role.guard';

const routes: Routes = [
    {path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
    {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
    // {path: 'admin-panel', loadChildren: './admin-login/admin-login.module#AdminLoginModule'},
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
    {path: '**', component: NotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
