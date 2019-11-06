import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-tours-home',
    templateUrl: './tours-home.component.html',
    styleUrls: ['./tours-home.component.scss']
})
export class ToursHomeComponent implements OnInit {

    constructor(
        public router: Router
    ) {
    }

    ngOnInit() {
    }

}
