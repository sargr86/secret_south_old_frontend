import {Component, OnInit} from '@angular/core';
import {FerryService} from '../../services/ferry.service';
import {Ferry} from '../../../shared/models/Ferry';
import {FERRIES_TABLE_COLUMNS, SPINNER_DIAMETER} from '../../../shared/constants/settings';
import {Observable} from 'rxjs/internal/Observable';

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
    ) {
    }

    ngOnInit() {
        this.ferries = this._ferry.getFerry();
    }


}
