import {Component, OnInit} from '@angular/core';
import {ToursService} from '@core/services/tours.service';
import {CommonService} from '@core/services/common.service';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.scss']
})
export class ShowOrdersComponent implements OnInit {
  tours;

  constructor(
    private toursService: ToursService,
    public common: CommonService
  ) {
  }

  ngOnInit(): void {
    this.tours = this.toursService.getAllTours();
    this.common.dataLoading = false;
  }

}
