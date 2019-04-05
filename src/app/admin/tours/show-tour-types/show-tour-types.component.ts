import {Component, OnInit} from '@angular/core';
import {ToursService} from '../../services/tours.service';

@Component({
    selector: 'app-show-tour-types',
    templateUrl: './show-tour-types.component.html',
    styleUrls: ['./show-tour-types.component.scss']
})
export class ShowTourTypesComponent implements OnInit {
    displayedColumns: string[] = ['tour_name', 'actions'];
    tourTypes;

    constructor(
        private _tours: ToursService) {
    }

    ngOnInit() {
        this.getTourTypes();
    }


    getTourTypes() {
       this.tourTypes = this._tours.getAllTourType();
    }
}
