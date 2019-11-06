import {Component, OnInit} from '@angular/core';
import {SubjectService} from '@core/services/subject.service';
import {ACCOMMODATIONS_FOLDER} from '@core/constants/settings';
import {MainService} from '../../home/services/main.service';

@Component({
    selector: 'app-accommodations-home',
    templateUrl: './accommodations-home.component.html',
    styleUrls: ['./accommodations-home.component.scss']
})
export class AccommodationsHomeComponent implements OnInit {
    accommodationObjects;
    accommodationsFolder = ACCOMMODATIONS_FOLDER;

    constructor(
        private subject: SubjectService,
        private main: MainService
    ) {
    }

    ngOnInit() {

        this.getObjects();

        this.subject.getMapData().subscribe(dt => {
            this.accommodationObjects = dt.list;
        });
    }

    getObjects() {
        this.main.changePlace({type: 'accommodations'}).subscribe((dt: any) => {

            this.accommodationObjects = dt;
        });


    }

}
