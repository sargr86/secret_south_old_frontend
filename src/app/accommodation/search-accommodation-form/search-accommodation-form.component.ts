import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Accommodation} from '@shared/models/Accommodation';
import {map, startWith} from 'rxjs/operators';
import {AccommodationsService} from '@core/services/accommodations.service';
import moment from 'moment';

@Component({
  selector: 'app-search-accommodation-form',
  templateUrl: './search-accommodation-form.component.html',
  styleUrls: ['./search-accommodation-form.component.scss']
})
export class SearchAccommodationFormComponent implements OnInit {

  @Output() searchClicked = new EventEmitter();

  accommodationForm: FormGroup;
  adultsCount;
  childrenCount;
  roomsCount;

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
    private accommodationsService: AccommodationsService
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
      adults: ['', [Validators.required]],
      children: ['', [Validators.required]],
      rooms: ['', [Validators.required]],
      checkin_date: ['', [Validators.required]],
      checkout_date: ['', [Validators.required]],
    });
  }

  patchForm() {
    const accommodationsSearch = JSON.parse(localStorage.getItem('accommodationsSearch'));

    this.adultsCount = accommodationsSearch.adults || 2;
    this.childrenCount = accommodationsSearch.children || 2;
    this.roomsCount = accommodationsSearch.rooms || 2;

    if (accommodationsSearch) {
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
        map(value => this._filter(value))
      );
    });
  }

  private _filter(value: string): Accommodation[] {
    const filterValue = value.toLowerCase();
    const f = this.accommodationObjects.filter(option => option.address.toLowerCase().indexOf(filterValue) === 0);

    // removing duplicates
    return f.filter((thing, index, self) =>
      index === self.findIndex((t) => (
        t.address === thing.address
      ))
    );
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
