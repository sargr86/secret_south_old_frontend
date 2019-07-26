import {Component, OnInit} from '@angular/core';
import {SubjectService} from '../../shared/services/subject.service';
import {ACCOMMODATIONS_FOLDER} from '../../shared/constants/settings';
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
        this.main.changePlace({type: 'food/drink'}).subscribe((dt: any) => {

            this.accommodationObjects = dt;
        });


    }

}
