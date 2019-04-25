import {Component, OnInit} from '@angular/core';
import {ACCOMMODATIONS_TABLE_COLUMNS, SPINNER_DIAMETER} from '../../../shared/constants/settings';
import {Observable} from 'rxjs';
import {AccommodationsService} from '../../../shared/services/accommodations.service';

@Component({
    selector: 'app-show-accommodations',
    templateUrl: './show-accommodations.component.html',
    styleUrls: ['./show-accommodations.component.scss']
})
export class ShowAccommodationsComponent implements OnInit {
    displayedColumns = ACCOMMODATIONS_TABLE_COLUMNS;
    spinnerDiameter = SPINNER_DIAMETER;
    accommodations: Observable<any>;

    constructor(
        private _accommodation: AccommodationsService
    ) {
    }

    ngOnInit() {
        this.accommodations = this._accommodation.get();
    }

}
