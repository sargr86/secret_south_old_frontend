import {Component, OnInit} from '@angular/core';
import {FerriesService} from '@core/services/ferries.service';
import {Ferry} from '@shared/models/Ferry';
import {Observable} from 'rxjs/internal/Observable';
import {CommonService} from '@core/services/common.service';
import {AuthService} from '@core/services/auth.service';
import {FERRIES_TABLE_COLUMNS, SPINNER_DIAMETER} from '@core/constants/global';

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
        private _ferry: FerriesService,
        public common: CommonService,
        public auth: AuthService
    ) {
    }

    ngOnInit() {
        const params = {};
        if (this.auth.checkRoles('partner')) {
            params['partner_id'] = this.auth.userData.id;
        }
        this.ferries = this._ferry.getFerries(params);
    }


}
