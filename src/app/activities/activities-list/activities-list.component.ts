import {Component, OnInit} from '@angular/core';
import {MainService} from '../../home/services/main.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ACTIVITIES_FOLDER} from '../../shared/constants/settings';

@Component({
    selector: 'app-activities-list',
    templateUrl: './activities-list.component.html',
    styleUrls: ['./activities-list.component.scss']
})
export class ActivitiesListComponent implements OnInit {
    activityProviders;
    activityFolder = ACTIVITIES_FOLDER;

    constructor(
        private main: MainService,
        public router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.getObjects();
    }

    getObjects() {
        this.main.changePlace({type: 'activities'}).subscribe((dt) => {
            this.activityProviders = dt;
        });
    }

    getStartDate() {

    }

    dateChanged() {

    }

    personsCountChanged(e) {

    }

}