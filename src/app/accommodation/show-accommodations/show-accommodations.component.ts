import {Component, OnInit} from '@angular/core';
import {ACCOMMODATIONS_TABLE_COLUMNS} from '@core/constants/global';
import {Observable} from 'rxjs';
import {AccommodationsService} from '@core/services/accommodations.service';
import {Accommodation} from '@shared/models/Accommodation';

@Component({
    selector: 'app-show-accommodations',
    templateUrl: './show-accommodations.component.html',
    styleUrls: ['./show-accommodations.component.scss']
})
export class ShowAccommodationsComponent implements OnInit {
    displayedColumns = ACCOMMODATIONS_TABLE_COLUMNS;
    accommodations: Observable<Accommodation>;

    constructor(
        private _accommodation: AccommodationsService
    ) {
    }

    ngOnInit() {
        this.accommodations = this._accommodation.get();
    }

}
