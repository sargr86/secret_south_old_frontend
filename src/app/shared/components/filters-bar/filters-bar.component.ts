import {Component, OnInit} from '@angular/core';
import {Options} from 'ng5-slider';

@Component({
    selector: 'app-filters-bar',
    templateUrl: './filters-bar.component.html',
    styleUrls: ['./filters-bar.component.scss']
})
export class FiltersBarComponent implements OnInit {
    value = 40;
    highValue = 180;
    options: Options = {
        floor: 0,
        ceil: 200
    };

    constructor() {
    }

    ngOnInit() {
    }

}
