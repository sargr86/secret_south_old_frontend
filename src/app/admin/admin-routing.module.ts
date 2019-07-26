import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {GpsLocationComponent} from './gps-location/gps-location.component';
import {AuthGuard} from '../shared/guards/auth.guard';
import {RoleGuard} from '../shared/guards/role.guard';
// import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {EditProfileComponent} from '../shared/components/edit-profile/edit-profile.component';
import {UserResolverService} from '../shared/resolvers/user-resolver.service';


const routes: Routes = [
    {
        path: 'dashboard/show', component: DashboardComponent, data: {
            title: 'Dashboard',
            expectedRole: 'admin'
        },

        canActivate: [AuthGuard, RoleGuard]
    },
    {
        path: 'dashboard/edit', component: EditProfileComponent, data: {
            title: 'Edit profile',
            expectedRole: 'admin'
        },
        canActivate: [AuthGuard, RoleGuard],
        resolve: {
            user: UserResolverService
        },
    },
    {
        path: 'employees',
        loadChildren: '../employees/employees.module#EmployeesModule',
        data: {
            expectedRole: 'admin'
        },
        canActivate: [AuthGuard, RoleGuard]
    },
    {
        path: 'customers',
        loadChildren: '../customers/customers.module#CustomersModule',
        data: {
            expectedRole: 'admin'
        },
        canActivate: [AuthGuard, RoleGuard]
    },
    {
        path: 'ferries',
        loadChildren: '../ferries/ferries.module#FerriesModule',
        data: {
            expectedRole: 'admin'
        },
        canActivate: [AuthGuard, RoleGuard]
    },
    {
        path: 'tours',
        loadChildren: '../tours/tours.module#ToursModule',
        data: {
            expectedRole: 'admin'
        },
        canActivate: [AuthGuard, RoleGuard]
    },
    {
        path: 'food-drink',
        loadChildren: '../food-drink/food-drink.module#FoodDrinkModule',
        data: {
            expectedRole: 'admin'
        },
        canActivate: [AuthGuard, RoleGuard]
    },
    {
        path: 'partners',
        loadChildren: '../partners/partners.module#PartnersModule',
        data: {
            expectedRole: 'admin'
        },
        canActivate: [AuthGuard, RoleGuard]
    },
    {
        path: 'companies',
        canActivate: [AuthGuard, RoleGuard],
        data: {
            expectedRole: 'admin'
        },
        loadChildren: '../companies/companies.module#CompaniesModule'
    },


    {
        path: 'accommodations',
        loadChildren: '../accommodation/accommodation.module#AccommodationModule',
        data: {
            expectedRole: 'admin'
        },
        canActivate: [AuthGuard, RoleGuard]
    },

    {
        path: 'activities',
        loadChildren: '../activities/activities.module#ActivitiesModule',
        data: {
            expectedRole: 'admin'
        },
        canActivate: [AuthGuard, RoleGuard]
    },
    {
        path: 'jobs',
        loadChildren: '../jobs/jobs.module#JobsModule',
        data: {
            // expectedRole: 'employee' RoleGuard
        },
        canActivate: [AuthGuard,]
    },
    {
        path: 'add_locations', component: GpsLocationComponent,
        data: {
            title: 'Add GPS locations',
            expectedRole: 'admin'
        },
        canActivate: [AuthGuard, RoleGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
