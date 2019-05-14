import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowEmployeesComponent} from './show-employees/show-employees.component';
import {SaveEmployeeComponent} from './save-employee/save-employee.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from '../shared/guards/auth.guard';
import {RoleGuard} from '../shared/guards/role.guard';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {UserResolverService} from '../shared/resolvers/user-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: ShowEmployeesComponent
    },
    {
        path: 'add',
        component: SaveEmployeeComponent
    },
    {
        path: 'dashboard',
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
        path: 'employees',
        loadChildren: '../employees/employees.module#EmployeesModule',
        data: {
            expectedRole: 'employee'
        },
        canActivate: [AuthGuard, RoleGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeesRoutingModule {
}
