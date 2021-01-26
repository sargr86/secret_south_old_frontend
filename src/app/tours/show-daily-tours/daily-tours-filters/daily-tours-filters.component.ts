import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ToursService} from '@core/services/tours.service';
import {CalendarView} from 'angular-calendar';
import moment from 'moment';

@Component({
  selector: 'app-daily-tours-filters',
  templateUrl: './daily-tours-filters.component.html',
  styleUrls: ['./daily-tours-filters.component.scss']
})
export class DailyToursFiltersComponent implements OnInit {
  filteredTours: Observable<string[]>;
  myControl = new FormControl();
  tours = [];
  filtersForm: FormGroup;
  nameFilter = '';

  filterDate = null;
  viewDate = moment().format('YYYY-MM-DD');
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;

  @Output('filter') filterAction = new EventEmitter();
  @Output('openDialog') openDialog = new EventEmitter();

  @ViewChild('trigger') trigger;

  constructor(
    private toursService: ToursService,
    private fb: FormBuilder
  ) {
    this.filtersForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.getAllTours();
    this.filteredTours = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(value => {
          return this._filter(value);
        })
      );
    this.filterAction.emit({name: this.nameFilter, date: this.viewDate, view: this.view});
  }


  getAllTours() {
    this.toursService.getAllTours().subscribe((dt: any) => {
      this.tours = dt;
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value?.toLowerCase();
    return this.tours.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getFilter(e) {
    this.nameFilter = e.name;
    this.filterAction.emit({name: this.nameFilter, date: moment(this.viewDate).format('YYYY-MM-DD'), view: this.view});
  }

  displayProp(tour) {
    return tour?.name;
  }

  openAddDaily() {
    this.openDialog.emit();
  }

  clearSelection() {
    this.myControl.patchValue('');
    this.filterAction.emit({name: '', date: moment(this.viewDate).format('YYYY-MM-DD'), view: this.view});
    this.focusTourFilterInput(this.trigger);
  }

  focusTourFilterInput(trigger) {
    trigger._onChange('');
    trigger.openPanel();
  }

  setView(view: CalendarView) {
    this.view = view;
    this.filterAction.emit({
      name: this.nameFilter,
      date: moment(this.viewDate).format('YYYY-MM-DD'),
      view: this.view
    });
  }

  changeViewDate(e) {
    this.filterAction.emit({
      date: moment(this.viewDate).format('YYYY-MM-DD'),
      view: this.view,
      name: this.nameFilter
    });
  }
}
