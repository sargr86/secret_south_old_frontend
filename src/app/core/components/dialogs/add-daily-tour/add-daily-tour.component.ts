import {Component, Inject, OnInit} from '@angular/core';
import moment from 'moment';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TIMEPICKER_THEME} from '@core/constants/global';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-daily-tour',
  templateUrl: './add-daily-tour.component.html',
  styleUrls: ['./add-daily-tour.component.scss']
})
export class AddDailyTourComponent implements OnInit {
  dailyTourForm: FormGroup;
  isSubmitted = false;
  timepickerTheme = TIMEPICKER_THEME;
  peopleCount = 2;
  tour;
  editCase = false;

  previousDatesFilter = (d: Date | null): boolean => {
    return moment(d).isSameOrAfter(moment(), 'day');
  }


  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.tour = data.tour;
    console.log(this.tour)
    this.editCase = !!this.tour;


  }

  ngOnInit(): void {
    this.dailyTourForm = this.fb.group({
      start_date: [''],
      start_time: [''],
      end_date: [''],
      end_time: [''],
      max_participants_count: [0],
      price: ['']
    });

    if (this.editCase) {
      this.peopleCount = this.tour.meta.max_participants_count;
      this.dailyTourForm.patchValue(this.tour.meta);
    }
  }

  dateChanged(e) {

  }

  peopleCountChanged(e) {

  }

}
