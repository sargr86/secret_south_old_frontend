import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonService} from '@core/services/common.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-activity-subtypes-home',
  templateUrl: './activity-subtypes-home.component.html',
  styleUrls: ['./activity-subtypes-home.component.scss']
})
export class ActivitySubtypesHomeComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  activitySubtypes = [];

  constructor(
    public common: CommonService,
    private route: ActivatedRoute
  ) {
    this.common.dataLoading = false;
  }

  ngOnInit(): void {
    this.subscriptions.push(this.route.data.subscribe((dt: any) => {
      this.activitySubtypes = dt.activity_subtypes;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
