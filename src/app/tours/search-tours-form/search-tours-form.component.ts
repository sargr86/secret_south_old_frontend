import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import moment from 'moment';
import {ToursService} from '@core/services/tours.service';
import {Router} from '@angular/router';
import {map, startWith} from 'rxjs/operators';
import {FilterLocationsForDropdownPipe} from '@shared/pipes/filter-locations-for-dropdown.pipe';
import {CommonService} from '@core/services/common.service';

@Component({
  selector: 'app-search-tours-form',
  templateUrl: './search-tours-form.component.html',
  styleUrls: ['./search-tours-form.component.scss']
})
export class SearchToursFormComponent implements OnInit {
  toursForm: FormGroup;

  filteredTours;
  tourControl = new FormControl();

  adultsCount = 2;
  childrenCount = 2;

  tourTypes;
  tours = [];

  previousDatesFilter = (d: Date | null): boolean => {
    return moment(d).isSameOrAfter(moment(), 'day');
  }

  constructor(
    private fb: FormBuilder,
    private toursService: ToursService,
    public router: Router,
    private filterLocations: FilterLocationsForDropdownPipe,
    public common: CommonService
  ) {
  }

  ngOnInit(): void {
    this.common.dataLoading = false;
    this.initForm();
    this.patchForm();
    this.getTourTypes();
    this.getAllTours();

    this.filteredTours = this.tourControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(value => {
          return this._filter(value);
        })
      );
  }

  initForm() {
    this.toursForm = this.fb.group({
      name: ['', [Validators.required]],
      adults: [this.adultsCount, [Validators.required]],
      children: [this.childrenCount, [Validators.required]],
      rooms: ['', [Validators.required]],
      date: ['', [Validators.required]],
      tours_type_id: ['', [Validators.required]],
    });
  }

  patchForm() {
    const toursSearch = JSON.parse(localStorage.getItem('toursSearch'));


    if (toursSearch) {
      this.adultsCount = toursSearch.adults;
      this.childrenCount = toursSearch.children;
      this.toursForm.patchValue(toursSearch);
      this.tourControl.patchValue(toursSearch.name);
    }
  }

  dateChanged(e) {
    this.toursForm.patchValue({date: moment(e.value).format('YYYY-MM-DD')});
  }

  adultsCountChanged(e) {
    this.toursForm.patchValue({adults: e});
  }

  childrenCountChanged(e) {
    this.toursForm.patchValue({children: e});
  }


  locationChanged(e) {
    console.log(e)
    this.toursForm.patchValue({name: e});
  }

  focusTourInput(trigger) {
    trigger._onChange('');
    trigger.openPanel();
  }

  clearSelection() {
    this.tourControl.patchValue('');
    this.getTourTypes();
  }

  getTourTypes() {
    this.toursService.getAllTourTypes().subscribe((dt: any) => {
      this.tourTypes = dt;
    });
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

  // displayProp(tour) {
  //   return tour?.name;
  // }

  search() {
    localStorage.setItem('toursSearch', JSON.stringify(this.toursForm.value));
    this.router.navigate(['tours/list']);
    console.log(this.toursForm.value)
  }

  tourTypesChanged(e) {
    console.log(e.target.value)
    this.toursForm.patchValue({tour_types_id: e});
  }


}
