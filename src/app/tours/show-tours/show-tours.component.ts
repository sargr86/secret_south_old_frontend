import {Component, OnInit} from '@angular/core';
import {TOURS_TABLE_COLUMNS, SPINNER_DIAMETER} from '../../shared/constants/settings';
import {Observable} from 'rxjs/internal/Observable';
import {ToursService} from '../../shared/services/tours.service';
import {Tour} from '../../shared/models/Tour';
import {AuthService} from '../../shared/services/auth.service';

@Component({
    selector: 'app-show-tours',
    templateUrl: './show-tours.component.html',
    styleUrls: ['./show-tours.component.scss']
})
export class ShowToursComponent implements OnInit {
    displayedColumns = TOURS_TABLE_COLUMNS;
    spinnerDiameter = SPINNER_DIAMETER;
    tours: Observable<Tour>;

    constructor(
        private _tours: ToursService,
        public auth: AuthService
    ) {
    }

    ngOnInit() {
        this.tours = this._tours.getAllTours();
    }

}
