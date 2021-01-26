import {Component, OnInit} from '@angular/core';
import {ToursService} from '@core/services/tours.service';
import {CommonService} from '@core/services/common.service';
import {MatDialog} from '@angular/material/dialog';
import {AddDailyTourComponent} from '@core/components/dialogs/add-daily-tour/add-daily-tour.component';
import moment from 'moment';
import {formatDate} from '@angular/common';
import {CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {Observable, Subject} from 'rxjs';
import {SaveDailyTourDialogComponent} from '@core/components/dialogs/save-daily-tour-dialog/save-daily-tour-dialog.component';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-show-daily-tours',
  templateUrl: './show-daily-tours.component.html',
  styleUrls: ['./show-daily-tours.component.scss']
})
export class ShowDailyToursComponent implements OnInit {

  tours = [];

  filterDate = null;
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  activeDayIsOpen = true;
  refresh: Subject<any> = new Subject();
  filter;

  CalendarView = CalendarView;

  constructor(
    private toursService: ToursService,
    public common: CommonService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.filterDate = formatDate(new Date(), 'dd/MM/yyyy', 'en');
    this.getDailies({scheduled: 0});
    this.common.dataLoading = false;
  }


  dateFilterChanged(e) {
    this.filterDate = moment(e.value).format('DD/MM/yyyy');
    this.getDailies({date: new Date(e.value)});
  }

  toggleScheduled(e) {
    this.getDailies({scheduled: e.checked ? 1 : 0});
  }

  getDailies(filter) {
    this.filter = filter;
    this.toursService.getDailies(filter).subscribe(dt => {
      this.tours = dt;
      this.viewDate = filter?.date;
      this.view = filter?.view;
    });
  }

  openAddDaily(tour = null) {
    this.dialog.open(SaveDailyTourDialogComponent, {data: {...tour, edit: false}}).afterClosed().subscribe(dt => {
      this.getDailies(this.filter);
    });
  }

  eventClicked(e) {
    // console.log('Event clicked', e);
    // console.log(this.tours[0].meta)
    const foundTour = this.tours.find(t => t.meta.id === e.meta.id);
    // console.log(foundTour)
    this.dialog.open(SaveDailyTourDialogComponent, {
      data: {
        tour: foundTour,
        edit: true
      }
    }).afterClosed().subscribe(dt => {
      this.getDailies(this.filter);
    });
  }

  dayClicked(e) {

  }


  changeViewDate() {

  }


  tourDatesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.toursService.updateTourDates({
      start_date: newStart,
      end_date: newEnd,
      id: event.meta.id
    }).subscribe(dt => {

    });
    this.refresh.next();
  }

}
