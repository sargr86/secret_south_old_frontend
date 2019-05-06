import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowEmployeesComponent} from './show-employees/show-employees.component';
import {SaveEmployeeComponent} from './save-employee/save-employee.component';

const routes: Routes = [
    {
        path: '',
        component: ShowEmployeesComponent
    },
    {
        path: 'add',
        component: SaveEmployeeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeesRoutingModule {
}
