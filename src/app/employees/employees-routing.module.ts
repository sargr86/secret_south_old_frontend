import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowEmployeesComponent} from './show-employees/show-employees.component';
import {SaveEmployeeComponent} from './save-employee/save-employee.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from '@core/guards/auth.guard';
import {RoleGuard} from '@core/guards/role.guard';
import {UserResolverService} from '@core/resolvers/user-resolver.service';
import {EditProfileComponent} from '@shared/components/edit-profile/edit-profile.component';

const routes: Routes = [
    {
        path: 'show',
        component: ShowEmployeesComponent
    },
    {
        path: 'add',
        component: SaveEmployeeComponent,
        data: {
            title: 'Invite an employee',
            user_type: 'employee',
            expectedRole: 'admin'
        }
    },
    {
        path: 'dashboard/show',
        component: DashboardComponent
    }, {
        path: 'dashboard/edit', data: {
            title: 'Edit profile',
            expectedRole: 'employee'
        },
        canActivate: [AuthGuard, RoleGuard],
        resolve: {
            user: UserResolverService
        },
        component: EditProfileComponent
    },
    {
        path: 'jobs',
        loadChildren: '../jobs/jobs.module#JobsModule',
        // data: {
        //     expectedRole: 'employee'
        // },
        canActivate: [AuthGuard, RoleGuard]
    },
    {
        path: ':id',
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
export class EmployeesRoutingModule {
}
