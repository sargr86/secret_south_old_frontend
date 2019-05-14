import {Component, OnInit} from '@angular/core';
import {EmployeesService} from '../../shared/services/employees.service';
import {EMPLOYEES_TABLE_COLUMNS} from '../../shared/constants/settings';

@Component({
    selector: 'app-show-employees',
    templateUrl: './show-employees.component.html',
    styleUrls: ['./show-employees.component.scss']
})
export class ShowEmployeesComponent implements OnInit {

    displayedColumns = EMPLOYEES_TABLE_COLUMNS;
    employees;

    constructor(
        private _employees: EmployeesService
    ) {
    }

    ngOnInit() {
        this.employees = this._employees.get();
    }

}
