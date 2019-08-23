import {Component, OnInit} from '@angular/core';
import {MainService} from '../../home/services/main.service';
import {ACCOMMODATIONS_FOLDER} from '@shared/constants/settings';
import {Accommodation} from '@shared/models/Accommodation';
import {Router} from '@angular/router';

@Component({
    selector: 'app-accommodations-list',
    templateUrl: './accommodations-list.component.html',
    styleUrls: ['./accommodations-list.component.scss']
})
export class AccommodationsListComponent implements OnInit {

    accommodationObjects: Accommodation[];
    accommodationsFolder = ACCOMMODATIONS_FOLDER;

    constructor(
        private main: MainService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.getObjects();
    }

    getObjects() {
        this.main.changePlace({type: 'accommodations'}).subscribe((dt: Accommodation[]) => {
            this.accommodationObjects = dt;
        });
    }

    getStartDate() {

    }

    dateChanged() {

    }
}
