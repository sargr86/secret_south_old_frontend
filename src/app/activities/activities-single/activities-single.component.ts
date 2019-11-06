import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivitiesService} from '@core/services/activities.service';

@Component({
    selector: 'app-activity-single',
    templateUrl: './activities-single.component.html',
    styleUrls: ['./activities-single.component.scss']
})
export class ActivitiesSingleComponent implements OnInit {
    activitiesProvider;

    constructor(
        private _activities: ActivitiesService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {

        const activity_id = this.route.snapshot.params.id;

        this._activities.getOne({id: activity_id}).subscribe(dt => {
            this.activitiesProvider = dt;
        });
    }

}
