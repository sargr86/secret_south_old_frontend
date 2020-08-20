import {Component, OnInit} from '@angular/core';
import {MainService} from '@core/services/main.service';
import {FoodDrink} from '@shared/models/FoodDrink';
import {COUNTRY_RESTRICTED_PLACES} from '@core/helpers/google-one-country-places-getter';
import {FOOD_DRINK_FOLDER, RESTAURANT_BOOKING_HOURS, TIMEPICKER_THEME} from '@core/constants/global';
import {Router} from '@angular/router';
import {CommonService} from '@core/services/common.service';
import {SubjectService} from '@core/services/subject.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FoodDrinkService} from '@core/services/food-drink.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-food-drink-list',
  templateUrl: './food-drink-list.component.html',
  styleUrls: ['./food-drink-list.component.scss']
})
export class FoodDrinkListComponent implements OnInit {

  foodDrinkObjects: FoodDrink[];
  foodDrinkForm: FormGroup;
  countryRestrictedPlaces = COUNTRY_RESTRICTED_PLACES;
  personsCount = 2;
  timepickerTheme = TIMEPICKER_THEME;
  foodDrinkFolder = FOOD_DRINK_FOLDER;
  bookingHours = RESTAURANT_BOOKING_HOURS;
  locationControl = new FormControl();
  filteredLocations;

  isSubmitted = false;

  constructor(
    private main: MainService,
    public router: Router,
    public common: CommonService,
    private subject: SubjectService,
    private foodDrinkService: FoodDrinkService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.common.dataLoading = false;

    this.foodDrinkForm = this.fb.group({
      location: ['', [Validators.required]],
      guests: [this.personsCount, [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]]
    });
  }

  ngOnInit() {


    const foodDrinkSearch = JSON.parse(localStorage.getItem('foodDrinkSearch'));
    if (foodDrinkSearch) {
      this.foodDrinkForm.patchValue(foodDrinkSearch);
      this.locationControl.patchValue(foodDrinkSearch.location)
      console.log(foodDrinkSearch)
      console.log(this.foodDrinkForm.value)
    }
    this.getObjects(foodDrinkSearch);

  }

  getObjects(search) {
    this.foodDrinkService.getByAddress({address: search.location}).subscribe((dt: FoodDrink[]) => {
      this.foodDrinkObjects = dt;
    });
  }

  getStartDate() {

  }

  dateChanged() {

  }

  async bookTable(obj, hour) {
    const foodDrinkSearch = JSON.parse(localStorage.getItem('foodDrinkSearch'));
    if (foodDrinkSearch) {
      foodDrinkSearch['name'] = obj.name;
      foodDrinkSearch['time'] = hour;
      foodDrinkSearch['img'] = obj.img;
      foodDrinkSearch['location'] = obj.address;
      console.log(obj)
      localStorage.setItem('foodDrinkSearch', JSON.stringify(foodDrinkSearch));
      await this.router.navigate(['food-drink/book-a-table']);
    } else {
      this.toastr.error('Please select booking details first', 'Booking is empty');
    }

  }

  locationChanged(e) {
    this.foodDrinkForm.patchValue({location: e});
  }

  personsCountChanged(e) {

  }

  getPath(item, folder) {
    const name = item.name.replace(/ /g, '_').replace(/&/g, '')
    return folder + '/' + decodeURIComponent(name) + '/' + item.img;
  }

  search() {
    console.log(this.foodDrinkForm.value)
  }
}
