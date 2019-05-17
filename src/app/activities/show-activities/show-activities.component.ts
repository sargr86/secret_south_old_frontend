import {Component, OnInit} from '@angular/core';
import {ActivitiesService} from '../../shared/services/activities.service';
import {ACTIVITIES_TABLE_COLUMNS} from '../../shared/constants/settings';

@Component({
    selector: 'app-show-activities',
    templateUrl: './show-activities.component.html',
    styleUrls: ['./show-activities.component.scss']
})
export class ShowActivitiesComponent implements OnInit {

    activities;
    displayedColumns = ACTIVITIES_TABLE_COLUMNS;

    constructor(
        private _activities: ActivitiesService
    ) {
    }

    ngOnInit() {
        this.activities = this._activities.get();
    }

}
