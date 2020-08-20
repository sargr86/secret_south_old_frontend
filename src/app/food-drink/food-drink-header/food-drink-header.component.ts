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
    private foodDrinkService: FoodDrinkService
  ) {
    this.foodDrinkForm = this.fb.group({
      location: ['', [Validators.required]],
      guests: [this.personsCount, [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]]
    });

    console.log(COUNTRY_RESTRICTED_PLACES)

  }

  ngOnInit() {
    // Checking for responsive mode and initializing map form
    this.responsiveMode = IsResponsive.check();
    this.mapForm = this.fb.group({
      type: ['']
    });

    this.foodDrinkService.getFoodDrink({}).subscribe(dt => {
      this.foodDrinkObjects = dt;
      console.log(this.foodDrinkObjects)
      this.filteredLocations = this.locationControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });


  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const f = this.foodDrinkObjects.filter(option => option.address.toLowerCase().indexOf(filterValue) === 0);

    // removing duplicates
    const fs = f.filter((thing, index, self) =>
      index === self.findIndex((t) => (
        t.address === thing.address
      ))
    );
    return fs;
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

  searchAccommodations() {
    // this.foodDrinkForm.value['location'] = this.searchAddress.el.nativeElement.value;
    console.log(this.searchAddress)
    console.log(this.foodDrinkForm.value)
    this.isSubmitted = true;
    if (this.foodDrinkForm.valid) {
      localStorage.setItem('foodDrinkSearch', JSON.stringify(this.foodDrinkForm.value))
      this.router.navigate(['food-drink/list']);
    }
  }

  personsCountChanged(e) {
    console.log(e)
    this.foodDrinkForm.patchValue({guests: e});
  }

  minReached() {
    console.log('min')
  }


}
