import {Component, OnInit} from '@angular/core';
import {ActivitiesService} from '@core/services/activities.service';
import {Router} from '@angular/router';
import {CommonService} from '@core/services/common.service';

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
    public router: Router,
    public common: CommonService
  ) {
  }

  ngOnInit() {

    this.routerUrl = this.router.url;
    this.common.dataLoading = false;

    this._activities.getTypes().subscribe(dt => {
      this.activityTypes = dt;
    });
  }

  async viewActivitySubType(subtype) {
    // subtype = subtype.toLowerCase().replace(/ /g, '');
    await this.router.navigate([`activities/subtype/${subtype}`]);
  }

}
