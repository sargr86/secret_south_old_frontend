import {Pipe, PipeTransform} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {DEFAULT_TOUR_MAX_PARTICIPANTS_COUNT} from '@core/constants/global';

@Pipe({
  name: 'getTourFormFields'
})
export class GetTourFormFieldsPipe implements PipeTransform {

  constructor(private fb: FormBuilder) {
  }

  transform(): unknown {
    return {
      name: ['', Validators.required],
      oldName: [''],
      locations: this.fb.array([
        this.getLocationsFormGroup('Start', 0),
        // this.getLocationsFormGroup('End', 1)
      ]),
      tours_type_id: ['', Validators.required],
      company_id: ['', Validators.required],
      start_date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      end_date: ['', Validators.required],
      max_participants_count: [DEFAULT_TOUR_MAX_PARTICIPANTS_COUNT, Validators.required],
      price: ['', Validators.required],
      img: [''],
      folder: 'tours'
    };
  }

  getLocationsFormGroup(title, order) {
    return this.fb.group({
      name: [''],
      title: [title],
      id: ['', Validators.required],
      order: [order]
    });
  }

}
