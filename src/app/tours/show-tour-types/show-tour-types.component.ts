import {Component, OnInit} from '@angular/core';
import {ToursService} from '@core/services/tours.service';
import {AuthService} from '@core/services/auth.service';

@Component({
    selector: 'app-show-tour-types',
    templateUrl: './show-tour-types.component.html',
    styleUrls: ['./show-tour-types.component.scss']
})
export class ShowTourTypesComponent implements OnInit {
    displayedColumns: string[] = ['name', 'actions'];
    tourTypes;

    constructor(
        private _tours: ToursService,
        public auth: AuthService
    ) {
    }

    ngOnInit() {
        this.getTourTypes();
    }


    getTourTypes() {
        this.tourTypes = this._tours.getAllTourTypes();
    }
}
