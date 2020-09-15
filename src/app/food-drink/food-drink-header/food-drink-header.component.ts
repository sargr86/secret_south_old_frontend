import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MAIN_SECTIONS, TIMEPICKER_THEME} from '@core/constants/global';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {COUNTRY_RESTRICTED_PLACES} from '@core/helpers/google-one-country-places-getter';
import {Router} from '@angular/router';
import {AuthService} from '@core/services/auth.service';
import {MainService} from '@core/services/main.service';
import {SubjectService} from '@core/services/subject.service';
import IsResponsive from '../../core/helpers/is-responsive';
import {NgxMaterialTimepickerTheme} from 'ngx-material-timepicker';
import moment from 'moment';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {map, startWith} from 'rxjs/operators';
import {FoodDrinkService} from '@core/services/food-drink.service';
import {FilterLocationsForDropdownPipe} from '@shared/pipes/filter-locations-for-dropdown.pipe';

@Component({
  selector: 'app-food-drink-header',
  templateUrl: './food-drink-header.component.html',
  styleUrls: ['./food-drink-header.component.scss']
})
export class FoodDrinkHeaderComponent implements OnInit {
  foodDrinkForm: FormGroup;
  mainSections = MAIN_SECTIONS;
  todayDate = Date.now()
  mapForm: FormGroup;
  latlng: any = [];
  lat = 0;
  lng = 0;
  subscriptions: Subscription[] = [];
  routerUrl: string;
  selectedSection = 'Food/Drink';
  responsiveMode: boolean;
  countryRestrictedPlaces = COUNTRY_RESTRICTED_PLACES;
  personsCount = 2;
  isSubmitted = false;
  minPeopleCountReached = false;
  locationControl = new FormControl();
  foodDrinkObjects;
  filteredLocations;


  @Output() toggle = new EventEmitter();

  @ViewChild('searchAddress') searchAddress;


  timepickerTheme = TIMEPICKER_THEME;
  previousDatesFilter = (d: Date | null): boolean => {
    return moment(d).isSameOrAfter(moment(), 'day');
  }

  constructor(
    public router: Router,
    public auth: AuthService,
    private fb: FormBuilder,
    private main: MainService,
    private subject: SubjectService,
    private foodDrinkService: FoodDrinkService,
    private filterLocations: FilterLocationsForDropdownPipe
  ) {
    this.foodDrinkForm = this.fb.group({
      location: ['', [Validators.required]],
      guests: [this.personsCount, [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]]
    });

  }

  ngOnInit() {
    // Checking for responsive mode and initializing map form
    this.responsiveMode = IsResponsive.check();
    this.mapForm = this.fb.group({
      type: ['']
    });

    this.foodDrinkService.get({}).subscribe(dt => {
      this.foodDrinkObjects = dt;
      this.filteredLocations = this.locationControl.valueChanges.pipe(
        startWith(''),
        map(value => this.filterLocations.transform(value, this.foodDrinkObjects))
      );
    });

  }

  toggleSidebar() {
    this.subject.setSidebarAction('toggle');
    this.toggle.emit();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  getStartDate() {

  }

  dateChanged(e: MatDatepickerInputEvent<string>) {
    this.foodDrinkForm.patchValue({date: e.value});
  }

  locationChanged(e) {
    this.foodDrinkForm.patchValue({location: e});
  }

  personsCountChanged(e) {
    this.foodDrinkForm.patchValue({guests: e});
  }

  minReached() {
    console.log('min')
  }


}
