import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonService} from '@core/services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
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
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.common.dataLoading = false;
  }

  ngOnInit(): void {
    this.subscriptions.push(this.route.data.subscribe((dt: any) => {
      this.activitySubtypes = dt.activity_subtypes;
    }));
  }

  async openSubtypePage(id) {
    await this.router.navigate([`${this.router.url}/subtypes/${id}`]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
