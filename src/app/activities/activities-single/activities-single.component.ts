import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivitiesService} from '@core/services/activities.service';
import {CommonService} from '@core/services/common.service';
import {SINGLE_PAGE_GALLERY_OPTIONS} from '@core/constants/global';
import {NgxGalleryImage} from 'ngx-gallery-9';

@Component({
  selector: 'app-activity-single',
  templateUrl: './activities-single.component.html',
  styleUrls: ['./activities-single.component.scss']
})
export class ActivitiesSingleComponent implements OnInit {
  activitiesProvider;
  galleryOptions = SINGLE_PAGE_GALLERY_OPTIONS;

  constructor(
    private _activities: ActivitiesService,
    private router: Router,
    private route: ActivatedRoute,
    public common: CommonService
  ) {
    this.common.dataLoading = false;
  }

  ngOnInit() {

    const activity_id = this.route.snapshot.params.id;

    this._activities.getOne({id: activity_id}).subscribe(dt => {
      this.activitiesProvider = dt;
    });
  }

  getImages() {
    return this.activitiesProvider.images as NgxGalleryImage[];
  }


}
