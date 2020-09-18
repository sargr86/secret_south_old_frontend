import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Accommodation} from '@shared/models/Accommodation';
import {map, startWith} from 'rxjs/operators';
import {AccommodationsService} from '@core/services/accommodations.service';
import moment from 'moment';
import {FilterLocationsForDropdownPipe} from '@shared/pipes/filter-locations-for-dropdown.pipe';

@Component({
  selector: 'app-search-accommodation-form',
  templateUrl: './search-accommodation-form.component.html',
  styleUrls: ['./search-accommodation-form.component.scss']
})
export class SearchAccommodationFormComponent implements OnInit {

  @Output() searchClicked = new EventEmitter();

  accommodationForm: FormGroup;
  adultsCount = 2;
  childrenCount = 2;
  roomsCount = 2;

  accommodationObjects: Accommodation[] = [];
  filteredLocations;
  locationControl = new FormControl();

  checkInDate: Date;

  previousDatesFilter = (d: Date | null): boolean => {
    return moment(d).isSameOrAfter(moment(), 'day');
  }

  checkoutDatesFilter = (d: Date | null): boolean => {
    return moment(d).isAfter(moment(this.checkInDate), 'day');
  }


  constructor(
    private fb: FormBuilder,
    private accommodationsService: AccommodationsService,
    private filterLocations: FilterLocationsForDropdownPipe
  ) {

  }

  ngOnInit(): void {
    this.initForm();
    this.patchForm();
    this.getAccommodations();
  }

  initForm() {
    this.accommodationForm = this.fb.group({
      location: ['', [Validators.required]],
      adults: [this.adultsCount, [Validators.required]],
      children: [this.childrenCount, [Validators.required]],
      rooms: [this.roomsCount, [Validators.required]],
      checkin_date: ['', [Validators.required]],
      checkout_date: ['', [Validators.required]],
    });
  }

  patchForm() {
    const accommodationsSearch = JSON.parse(localStorage.getItem('accommodationsSearch'));

    if (accommodationsSearch) {
      this.adultsCount = accommodationsSearch.adults;
      this.childrenCount = accommodationsSearch.children;
      this.roomsCount = accommodationsSearch.rooms;

      this.accommodationForm.patchValue(accommodationsSearch);
      this.locationControl.patchValue(accommodationsSearch.location);
    }
  }

  dateChanged() {

  }

  checkInDateChanged(e) {
    this.checkInDate = e.value;
    this.accommodationForm.patchValue({checkin_date: this.checkInDate});
  }

  adultsCountChanged(e) {
    this.accommodationForm.patchValue({adults: e});
  }

  roomsCountChanged(e) {
    this.accommodationForm.patchValue({rooms: e});
  }

  childrenCountChanged(e) {
    this.accommodationForm.patchValue({children: e});
  }


  locationChanged(e) {
    this.accommodationForm.patchValue({location: e});
  }

  clearLocation() {
    this.locationControl.patchValue('');
    this.getAccommodations();
  }

  getAccommodations() {
    this.accommodationsService.get().subscribe((dt: Accommodation[]) => {
      this.accommodationObjects = dt;
      this.filteredLocations = this.locationControl.valueChanges.pipe(
        startWith(''),
        map(value => this.filterLocations.transform(value, dt))
      );
    });
  }

  search() {
    // console.log(this.accommodationForm.value)
    // console.log(this.accommodationForm.valid)
    // if (this.accommodationForm.valid) {
    localStorage.setItem('accommodationsSearch', JSON.stringify(this.accommodationForm.value));
    this.searchClicked.emit(this.accommodationForm.value);
    // }
  }

}
