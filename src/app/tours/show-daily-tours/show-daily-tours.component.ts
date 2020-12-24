import {Component, OnInit} from '@angular/core';
import {ToursService} from '@core/services/tours.service';
import {CommonService} from '@core/services/common.service';
import {MatDialog} from '@angular/material/dialog';
import {AddDailyTourComponent} from '@core/components/dialogs/add-daily-tour/add-daily-tour.component';
import moment from 'moment';

@Component({
  selector: 'app-show-daily-tours',
  templateUrl: './show-daily-tours.component.html',
  styleUrls: ['./show-daily-tours.component.scss']
})
export class ShowDailyToursComponent implements OnInit {

  tours;
  filterDate = null;

  constructor(
    private toursService: ToursService,
    public common: CommonService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getDailies({scheduled: 0});
    this.common.dataLoading = false;
  }

  dateFilterChanged(e) {
    this.filterDate = moment(e.value).format('DD/MM/yyyy');
    this.getDailies({date: new Date(e.value)});
  }

  toggleScheduled(e) {
    console.log(e.checked)
    this.getDailies({scheduled: e.checked ? 1 : 0});
  }

  getDailies(filter) {
    console.log(filter)
    this.toursService.getDailies(filter).subscribe(dt => {
      this.tours = dt;
    });
  }

  openAddDaily(tour) {
    this.dialog.open(AddDailyTourComponent, {data: {tour}}).afterClosed().subscribe(dt => {

    });
  }

}
