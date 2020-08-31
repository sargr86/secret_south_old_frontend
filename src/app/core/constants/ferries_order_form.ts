import {Validators} from '@angular/forms';

export function getFerryLocationsFormGroup(title, order) {
  return {
    name: ['', Validators.required],
    // latitude: ['', Validators.required],
    // longitude: ['', Validators.required],
    title: [title],
    order: [order]
  };
}

export const PASSENGER_DETAILS_FORM_GROUP = {
  adults: ['', Validators.required],
  children: ['', [Validators.required]],
};
