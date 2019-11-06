import {Component, OnInit} from '@angular/core';
import {ActivitiesService} from '@core/services/activities.service';

@Component({
    selector: 'app-activities-home',
    templateUrl: './activities-home.component.html',
    styleUrls: ['./activities-home.component.scss']
})
export class ActivitiesHomeComponent implements OnInit {
    activityTypes;
    activities;

    constructor(
        private _activities: ActivitiesService
    ) {
    }

    ngOnInit() {
        this._activities.getTypes().subscribe(dt => {
            this.activityTypes = dt;
        });
    }

}
