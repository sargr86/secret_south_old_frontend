import { Component, OnInit } from '@angular/core';
import {ActivitiesService} from '@core/services/activities.service';

@Component({
  selector: 'app-show-activity-types',
  templateUrl: './show-activity-types.component.html',
  styleUrls: ['./show-activity-types.component.scss']
})
export class ShowActivityTypesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'actions'];
  activityTypes;

  constructor(
      private _activities: ActivitiesService) {
  }

  ngOnInit() {
    this.getTourTypes();
  }


  getTourTypes() {
    this.activityTypes = this._activities.getTypes();
  }
}
