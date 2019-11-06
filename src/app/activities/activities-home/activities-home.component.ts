import {Component, OnInit} from '@angular/core';
import {ActivitiesService} from '@core/services/activities.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-activities-home',
    templateUrl: './activities-home.component.html',
    styleUrls: ['./activities-home.component.scss']
})
export class ActivitiesHomeComponent implements OnInit {
    activityTypes;
    activities;
    routerUrl;

    constructor(
        private _activities: ActivitiesService,
        public router: Router
    ) {
    }

    ngOnInit() {

        this.routerUrl = this.router.url;

        this._activities.getTypes().subscribe(dt => {
            this.activityTypes = dt;
        });
    }

}
