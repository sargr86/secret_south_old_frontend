import {Component, OnInit} from '@angular/core';
import {MainService} from '@core/services/main.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ACTIVITIES_FOLDER, TIMEPICKER_THEME} from '@core/constants/global';
import {CommonService} from '@core/services/common.service';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss']
})
export class ActivitiesListComponent implements OnInit {
  activityProviders;
  activityFolder = ACTIVITIES_FOLDER;
  personsCount = 2;
  timepickerTheme = TIMEPICKER_THEME;

  constructor(
    private main: MainService,
    public router: Router,
    private route: ActivatedRoute,
    public common: CommonService
  ) {
    this.common.dataLoading = false;
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

  getPath(item, folder) {
    const name = item.name.replace(/ /g, '_').replace(/&/g, '')
    return folder + '/' + decodeURIComponent(name) + '/' + item.img;
  }

}
