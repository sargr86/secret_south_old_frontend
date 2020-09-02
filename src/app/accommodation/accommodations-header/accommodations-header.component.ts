import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '@core/services/auth.service';
import {MAIN_SECTIONS} from '@core/constants/global';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MainService} from '@core/services/main.service';
import {SubjectService} from '@core/services/subject.service';
import {COUNTRY_RESTRICTED_PLACES} from '@core/helpers/google-one-country-places-getter';
import {MatDatepicker} from '@angular/material/datepicker';
import {Options} from 'ngx-google-places-autocomplete/objects/options/options';
import {Accommodation} from '@shared/models/Accommodation';
import {map, startWith} from 'rxjs/operators';
import {AccommodationsService} from '@core/services/accommodations.service';
import moment from 'moment';

@Component({
  selector: 'app-accommodations-header',
  templateUrl: './accommodations-header.component.html',
  styleUrls: ['./accommodations-header.component.scss']
})
export class AccommodationsHeaderComponent implements OnInit {
  mainSections = MAIN_SECTIONS;
  mapForm: FormGroup;
  accommodationsForm: FormGroup;

  subscriptions: Subscription[] = [];
  routerUrl: string;
  countryRestrictedPlaces = COUNTRY_RESTRICTED_PLACES as Options;
  checkInDate: Date;

  @Output() toggle = new EventEmitter();

  personsCount = 2;
  accommodationObjects: Accommodation[] = [];
  locationControl = new FormControl();
  filteredLocations;


  previousDatesFilter = (d: Date | null): boolean => {
    return moment(d).isSameOrAfter(moment(), 'day');
  }

  checkoutDatesFilter = (d: Date | null): boolean => {
    return moment(d).isAfter(moment(this.checkInDate), 'day');
  }

  constructor(
    public router: Router,
    public auth: AuthService,
    private fb: FormBuilder,
    private main: MainService,
    private subject: SubjectService,
    private accommodationsService: AccommodationsService
  ) {

    this.accommodationsForm = this.fb.group({
      location: ['', [Validators.required]],
      guests: [this.personsCount, [Validators.required]],
      checkin_date: ['', [Validators.required]],
      checkout_date: ['', [Validators.required]],
    });

  }


  ngOnInit() {

    // Checking for responsive mode and initializing map form
    this.mapForm = this.fb.group({
      type: ['']
    });

    this.getAccommodations();
  }


  getPicker(p) {
    return p as MatDatepicker<string & Date>;
  }


  getStartDate() {

  }

  checkInDateChanged(e) {
    this.checkInDate = e.value;
    this.accommodationsForm.patchValue({checkin_date: this.checkInDate});
  }

  dateChanged() {

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

  searchAccommodations() {
    if (this.accommodationsForm.valid) {
      localStorage.setItem('accommodationsSearch', JSON.stringify(this.accommodationsForm.value));
      this.router.navigate(['accommodations/list']);
    }
  }

  personsCountChanged(e) {

  }

  locationChanged(e) {
    this.accommodationsForm.patchValue({location: e});
  }

}
