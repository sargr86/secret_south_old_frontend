import {Component, OnInit} from '@angular/core';
import {FerryService} from '../../shared/services/ferry.service';
import {Ferry} from '../../shared/models/Ferry';
import {Observable} from 'rxjs/internal/Observable';
import {CommonService} from '../../shared/services/common.service';
import {AuthService} from '../../shared/services/auth.service';
import {FERRIES_TABLE_COLUMNS, SPINNER_DIAMETER} from '../../shared/constants/settings';

@Component({
    selector: 'app-show-ferries',
    templateUrl: './show-ferries.component.html',
    styleUrls: ['./show-ferries.component.scss']
})
export class ShowFerriesComponent implements OnInit {
    displayedColumns = FERRIES_TABLE_COLUMNS;
    spinnerDiameter = SPINNER_DIAMETER;
    ferries: Observable<Ferry>;

    constructor(
        private _ferry: FerryService,
        public common: CommonService,
        public auth: AuthService
    ) {
    }

    ngOnInit() {
        this.ferries = this._ferry.getFerry();
    }


}
