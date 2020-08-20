import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '@core/services/common.service';
import {ALLOWED_COUNTRIES, DEFAULT_COUNTRY, FOOD_DRINK_FOLDER} from '@core/constants/global';
import {Router} from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'app-food-drink-order-form',
  templateUrl: './food-drink-order-form.component.html',
  styleUrls: ['./food-drink-order-form.component.scss']
})
export class FoodDrinkOrderFormComponent implements OnInit {

  tableBookForm: FormGroup;
  allowedCountries = ALLOWED_COUNTRIES;
  defaultCountry = DEFAULT_COUNTRY;
  personsCount = 2;
  foodDrinkFolder = FOOD_DRINK_FOLDER;
  search;

  constructor(
    private fb: FormBuilder,
    public common: CommonService,
    public router: Router
  ) {
    this.common.dataLoading = false;
    this.tableBookForm = this.fb.group({
      location: ['', [Validators.required]],
      guests: [this.personsCount, [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      first_name: ['aaa', Validators.required],
      last_name: ['bbb', Validators.required],
      phone: ['12121212', Validators.required],
      email: ['aaa@aa.bb', Validators.required]
    });
  }

  ngOnInit(): void {
    const foodDrinkSearch = JSON.parse(localStorage.getItem('foodDrinkSearch'));
    this.search = foodDrinkSearch;
    if (foodDrinkSearch) {
      this.tableBookForm.patchValue(foodDrinkSearch);
      console.log(this.tableBookForm.value)
    }
  }

  getPath(item, folder) {
    const name = item.name.replace(/ /g, '_').replace(/&/g, '')
    return folder + '/' + decodeURIComponent(name) + '/' + item.img;
  }

  getDate() {
    return moment(this.search.date).format('ddd, DD MMM');
  }

}
