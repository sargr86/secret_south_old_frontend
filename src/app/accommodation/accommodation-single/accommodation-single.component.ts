import {Component, OnInit} from '@angular/core';
import {AccommodationsService} from '@core/services/accommodations.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '@core/services/common.service';
import {NgxGalleryImage} from 'ngx-gallery-9';
import {SubjectService} from '@core/services/subject.service';
import {SINGLE_PAGE_GALLERY_OPTIONS} from '@core/constants/global';

@Component({
  selector: 'app-accommodation-single',
  templateUrl: './accommodation-single.component.html',
  styleUrls: ['./accommodation-single.component.scss']
})
export class AccommodationSingleComponent implements OnInit {
  accommodationProvider;
  galleryOptions = SINGLE_PAGE_GALLERY_OPTIONS;

  constructor(
    private _accommodations: AccommodationsService,
    private router: Router,
    private route: ActivatedRoute,
    public common: CommonService,
    private subject: SubjectService
  ) {
    this.common.dataLoading = false;
  }

  ngOnInit() {

    const accommodation_id = this.route.snapshot.params.id;

    this._accommodations.getOne({id: accommodation_id}).subscribe(dt => {
      this.accommodationProvider = dt;
    });
  }

  getImages() {
    return this.accommodationProvider.images as NgxGalleryImage[];
  }

}
