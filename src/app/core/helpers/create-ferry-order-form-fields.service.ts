import {Injectable} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {getFerryLocationsFormGroup, PASSENGER_DETAILS_FORM_GROUP} from '@core/constants/ferries_order_form';

@Injectable({
  providedIn: 'root'
})
export class CreateFerryOrderFormFieldsService {

  constructor(private fb: FormBuilder) {
  }

  get() {
    return this.fb.group({
      locations: this.fb.array([
        this.fb.group(getFerryLocationsFormGroup('Start', 0)),
        this.fb.group(getFerryLocationsFormGroup('End', 1)),
      ]),
      start_time: [''],
      end_time: [''],
      wayType: [1],
      more: this.fb.group(PASSENGER_DETAILS_FORM_GROUP),
      payment: [1],
      status: ['pending']
    });
  }
}
