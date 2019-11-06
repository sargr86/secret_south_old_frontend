import {Component, OnInit} from '@angular/core';
import {CUSTOMERS_TABLE_COLUMNS} from '@core/constants/settings';
import {Observable} from 'rxjs';
import {User} from '@shared/models/User';
import {CustomersService} from '@core/services/customers.service';

@Component({
    selector: 'app-show-customers',
    templateUrl: './show-customers.component.html',
    styleUrls: ['./show-customers.component.scss']
})
export class ShowCustomersComponent implements OnInit {

    displayedColumns = CUSTOMERS_TABLE_COLUMNS;
    customers: Observable<User>;

    constructor(
        private _customers: CustomersService
    ) {
    }

    ngOnInit() {
        this.customers = this._customers.get();
    }

}
