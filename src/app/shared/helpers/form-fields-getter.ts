import {Validators} from '@angular/forms';
import {patternValidator} from './pattern-validator';
import {LATITUDE_PATTERN, LONGITUDE_PATTERN} from '../constants/patterns';

export const FOOD_DRINK_FIELDS = {
    name: ['', Validators.required],
    lat: ['', [Validators.required, patternValidator(LATITUDE_PATTERN)]],
    lng: ['', [Validators.required, patternValidator(LONGITUDE_PATTERN)]],
    description: ['', Validators.required],
    address: ['', Validators.required],
    company_id: ['', Validators.required],
    folder: 'food-drink',
};
