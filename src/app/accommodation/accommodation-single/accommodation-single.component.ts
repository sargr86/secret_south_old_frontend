import {Component, OnInit} from '@angular/core';
import {AccommodationsService} from '@core/services/accommodations.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '@core/services/common.service';

@Component({
  selector: 'app-accommodation-single',
  templateUrl: './accommodation-single.component.html',
  styleUrls: ['./accommodation-single.component.scss']
})
export class AccommodationSingleComponent implements OnInit {
  accommodation;

  constructor(
    private _accommodations: AccommodationsService,
    private router: Router,
    private route: ActivatedRoute,
    public common: CommonService
  ) {
    this.common.dataLoading = false;
  }

  ngOnInit() {

    const accommodation_id = this.route.snapshot.params.id;

    this._accommodations.getOne({id: accommodation_id}).subscribe(dt => {
      this.accommodation = dt;
    });
  }

}
