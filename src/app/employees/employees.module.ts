import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { SaveEmployeeComponent } from './save-employee/save-employee.component';
import { ShowEmployeesComponent } from './show-employees/show-employees.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [SaveEmployeeComponent, ShowEmployeesComponent],
    imports: [
        CommonModule,
        EmployeesRoutingModule,
        SharedModule
    ]
})
export class EmployeesModule { }
