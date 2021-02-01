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
  popularTours;
  todaysTours;

  constructor(
    public router: Router,
    public common: CommonService,
    private toursService: ToursService
  ) {
  }

  ngOnInit() {
    this.common.dataLoading = false;
    // this.getTourTypes();
    this.getPopularTours();
    this.getTodaysTours();
  }

  getTourTypes() {
    this.toursService.getAllTourTypes().subscribe((dt) => {
      this.tourTypes = dt;
    });
  }

  getPopularTours() {
    this.toursService.getDailies({calendar: false, today: true}).subscribe(dt => {
      this.popularTours = dt;
    });
  }

  getTodaysTours() {
    this.toursService.getDailies({calendar: false}).subscribe(dt => {
      console.log(dt)
      this.todaysTours = dt;
    });
  }

}
