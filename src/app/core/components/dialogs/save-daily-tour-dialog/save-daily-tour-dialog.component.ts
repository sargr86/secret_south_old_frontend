import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TIMEPICKER_THEME} from '@core/constants/global';
import moment from 'moment';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ToursService} from '@core/services/tours.service';

@Component({
  selector: 'app-save-daily-tour-dialog',
  templateUrl: './save-daily-tour-dialog.component.html',
  styleUrls: ['./save-daily-tour-dialog.component.scss']
})
export class SaveDailyTourDialogComponent implements OnInit {

  dailyTourForm: FormGroup;
  isSubmitted = false;
  timepickerTheme = TIMEPICKER_THEME;
  peopleCount = 2;
  tour;
  editCase = false;
  toursList;

  previousDatesFilter = (d: Date | null): boolean => {
    return moment(d).isSameOrAfter(moment(), 'day');
  }


  constructor(
    private fb: FormBuilder,
    private toursService: ToursService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.tour = data.tour;
    this.editCase = !!this.tour;


  }

  ngOnInit(): void {
    this.initForm();
    this.getToursList();

    if (this.editCase) {
      this.peopleCount = this.tour.meta.max_participants_count;
      this.dailyTourForm.patchValue(this.tour.meta);
    }
  }

  initForm() {
    this.dailyTourForm = this.fb.group({
      start_date: [''],
      start_time: [''],
      end_date: [''],
      end_time: [''],
      max_participants_count: [0],
      price: ['']
    });
  }

  getToursList() {
    this.toursService.getAllTours().subscribe(dt => {
      this.toursList = dt;
    });
  }

  tourChanged(e) {
    this.toursService.getOneTour({id: e.target.value}).subscribe((dt: any) => {
      this.tour = dt?.tours_dailies ?. [0] || [];
      this.dailyTourForm.patchValue(this.tour);
      this.peopleCount = this.tour.max_participants_count;
    });
  }

  dateChanged(e) {

  }

  peopleCountChanged(e) {

  }

  save() {

  }

}
