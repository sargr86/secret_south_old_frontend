import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from '@core/services/common.service';
import {TourTypeService} from '@core/services/tour-type.service';
import {ToursService} from '@core/services/tours.service';
import {TOURS_FOLDER} from '@core/constants/global';

@Component({
  selector: 'app-tours-home',
  templateUrl: './tours-home.component.html',
  styleUrls: ['./tours-home.component.scss']
})
export class ToursHomeComponent implements OnInit {
  tourTypes;
  toursFolder = TOURS_FOLDER;

  constructor(
    public router: Router,
    public common: CommonService,
    private toursService: ToursService
  ) {
  }

  ngOnInit() {
    this.common.dataLoading = false;
    this.getTourTypes();
  }

  getTourTypes() {
    this.toursService.getAllTourTypes().subscribe((dt) => {
      this.tourTypes = dt;
    });
  }

}
