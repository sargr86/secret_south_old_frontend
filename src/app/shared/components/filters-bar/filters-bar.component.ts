import {Component, Input, OnInit} from '@angular/core';
import {Options} from 'ng5-slider';
import {Router} from '@angular/router';

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
    @Input() section;

    constructor(
        public router: Router
    ) {
    }

    ngOnInit() {
    }

}
