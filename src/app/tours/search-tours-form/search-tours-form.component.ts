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

  filteredLocations;
  locationControl = new FormControl();

  adultsCount = 2;
  childrenCount = 2;

  tourTypes;

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
    this.getTours();
  }

  initForm() {
    this.toursForm = this.fb.group({
      location: ['', [Validators.required]],
      adults: [this.adultsCount, [Validators.required]],
      children: [this.childrenCount, [Validators.required]],
      rooms: ['', [Validators.required]],
      date: ['', [Validators.required]],
      tours_type_id: ['', [Validators.required]],
    });
  }

  patchForm() {
    const accommodationsSearch = JSON.parse(localStorage.getItem('toursSearch'));


    if (accommodationsSearch) {
      this.adultsCount = accommodationsSearch.adults;
      this.childrenCount = accommodationsSearch.children;
      this.toursForm.patchValue(accommodationsSearch);
      this.locationControl.patchValue(accommodationsSearch.location);
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
    this.toursForm.patchValue({location: e});
  }

  clearLocation() {
    this.locationControl.patchValue('');
    this.getTours();
  }

  getTours() {
    this.toursService.getAllTourTypes().subscribe((dt: any) => {
      this.tourTypes = dt;

    });
  }

  getTourLocations() {
    // this.filteredLocations = this.locationControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this.filterLocations.transform(value, dt))
    // );
  }

  search() {
    this.router.navigate(['tours/list']);
    console.log(this.toursForm.value)
  }

  tourTypesChanged(e) {
    console.log(e.target.value)
    this.toursForm.patchValue({tour_types_id: e});
  }


}
