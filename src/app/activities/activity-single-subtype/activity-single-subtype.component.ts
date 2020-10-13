import {Component, OnInit} from '@angular/core';
import {CommonService} from '@core/services/common.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-activity-single-subtype',
  templateUrl: './activity-single-subtype.component.html',
  styleUrls: ['./activity-single-subtype.component.scss']
})
export class ActivitySingleSubtypeComponent implements OnInit {
  subscriptions: Subscription [] = [];
  activitySubtype;

  constructor(
    public common: CommonService,
    private route: ActivatedRoute
  ) {
    this.common.dataLoading = false;
  }

  ngOnInit(): void {
    this.subscriptions.push(this.route.data.subscribe((dt: any) => {
      this.activitySubtype = dt.activity_subtype;
    }));
  }

}
