import {Component, OnInit} from '@angular/core';
import {EmployeesService} from '@core/services/employees.service';
import {EMPLOYEES_TABLE_COLUMNS} from '@core/constants/settings';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '@core/services/auth.service';

@Component({
    selector: 'app-show-employees',
    templateUrl: './show-employees.component.html',
    styleUrls: ['./show-employees.component.scss']
})
export class ShowEmployeesComponent implements OnInit {

    displayedColumns = EMPLOYEES_TABLE_COLUMNS;
    employees;

    constructor(
        private _employees: EmployeesService,
        private route: ActivatedRoute,
        public auth: AuthService
    ) {
    }

    ngOnInit() {
        this.route.data.subscribe(dt => {
            const company = dt.expectedRole === 'partner'? this.auth.userData.company.name : '';
            this.employees = this._employees.get(company);
        });

    }

}
