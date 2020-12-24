import {Validators} from '@angular/forms';
import {patternValidator} from './pattern-validator';
import {LATITUDE_PATTERN, LONGITUDE_PATTERN} from '@core/constants/patterns';

export const FOOD_DRINK_FIELDS = {
  name: ['', Validators.required],
  oldName: [''],
  lat: ['', [Validators.required, patternValidator(LATITUDE_PATTERN)]],
  lng: ['', [Validators.required, patternValidator(LONGITUDE_PATTERN)]],
  description: ['', Validators.required],
  address: ['', Validators.required],
  company_id: ['', Validators.required],
  folder: 'food-drink',
  img: ''
};

export const FERRY_FIELDS = {
  name: ['', Validators.required],
  oldName: [''],
  max_people: [12, Validators.required],
  min_people: [5, Validators.required],
  lat: ['', [Validators.required, patternValidator(LATITUDE_PATTERN)]],
  lng: ['', [Validators.required, patternValidator(LONGITUDE_PATTERN)]],
  phone: ['', [Validators.required]],
  address: ['', Validators.required],
  company_id: ['', Validators.required],
  folder: 'ferries',
  img: ''
};

export const ACCOMMODATION_FIELDS = {
  name: ['', Validators.required],
  oldName: [''],
  lat: ['', [Validators.required, patternValidator(LATITUDE_PATTERN)]],
  lng: ['', [Validators.required, patternValidator(LONGITUDE_PATTERN)]],
  description: [''],
  address: ['', Validators.required],
  company_id: ['', Validators.required],
  folder: 'accommodations',
  img: ''
};

export const TOURS_FIELDS = {
  name: ['', Validators.required],
  oldName: [''],
  tours_type_id: ['', Validators.required],
  company_id: ['', Validators.required],
  start_date: ['', Validators.required],
  start_time: ['', Validators.required],
  end_time: ['', Validators.required],
  end_date: ['', Validators.required],
  max_participants_count: ['', Validators.required],
  price: ['', Validators.required],
  folder: 'tours',
  locations: [[], Validators.required],
};
