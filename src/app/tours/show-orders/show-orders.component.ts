import {Component, OnInit} from '@angular/core';
import {ToursService} from '@core/services/tours.service';
import {CommonService} from '@core/services/common.service';
import {MatDialog} from '@angular/material/dialog';
import {AddDailyTourComponent} from '@core/components/dialogs/add-daily-tour/add-daily-tour.component';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.scss']
})
export class ShowOrdersComponent implements OnInit {
  tours;

  constructor(
    private toursService: ToursService,
    public common: CommonService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.tours = this.toursService.getAllTours();
    this.common.dataLoading = false;
  }

  openAddDaily() {
    this.dialog.open(AddDailyTourComponent, {}).afterClosed().subscribe(dt => {

    });
  }

}
