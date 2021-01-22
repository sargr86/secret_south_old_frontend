import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ToursService} from '@core/services/tours.service';
import {CalendarView} from 'angular-calendar';

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

  filterDate = null;
  viewDate: Date = new Date();
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
    this.getDailies({});
    this.filteredTours = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(value => {
          return this._filter(value);
        })
      );
  }


  getDailies(filter) {
    this.toursService.getAllTours().subscribe((dt: any) => {
      this.tours = dt;
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value?.toLowerCase();
    return this.tours.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getFilter(e) {
    console.log('get filter')
    this.filterAction.emit({name: e.name});
  }

  displayProp(tour) {
    return tour?.name;
  }

  openAddDaily() {
    this.openDialog.emit();
  }

  clearSelection() {
    this.myControl.patchValue('');
    this.filterAction.emit({name: ''});
    this.focusTourFilterInput(this.trigger);
  }

  focusTourFilterInput(trigger) {
    trigger._onChange('');
    trigger.openPanel();
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  changeViewDate() {

  }
}
