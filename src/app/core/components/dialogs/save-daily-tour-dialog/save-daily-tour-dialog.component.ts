import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TIMEPICKER_THEME} from '@core/constants/global';
import moment from 'moment';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ToursService} from '@core/services/tours.service';
import {ConfirmationDialogComponent} from '@shared/components/confirmation-dialog/confirmation-dialog.component';

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
    private dialog: MatDialogRef<SaveDailyTourDialogComponent>,
    private matDialog: MatDialog,
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
      this.dailyTourForm.patchValue({...this.tour.meta, start_date: this.tour.start, end_date: this.tour.end});
    }
  }

  initForm() {
    this.dailyTourForm = this.fb.group({
      id: [''],
      tour_id: ['', [Validators.required]],
      company_id: [''],
      start_date: ['', [Validators.required]],
      start_time: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      end_time: ['', [Validators.required]],
      max_participants_count: ['', [Validators.required]],
      price: ['', [Validators.required]]
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
      this.tour.start_date = moment().format('YYYY-MM-DD');
      this.tour.end_date = moment().add(1, 'days').format('YYYY-MM-DD');
      this.dailyTourForm.patchValue(this.tour);
      this.peopleCount = this.tour.max_participants_count;
    });
  }

  dateChanged(e) {

  }

  peopleCountChanged(e) {
    this.dailyTourForm.patchValue({max_participants_count: e});
    console.log(e)
  }

  save() {
    this.isSubmitted = true;
    console.log(this.dailyTourForm.get('tour_id').hasError('required'))
    console.log(this.dailyTourForm.value)
    if (this.dailyTourForm.valid) {
      if (this.editCase) {
        this.toursService.updateDailyTour(this.dailyTourForm.value).subscribe(dt => {
          this.dialog.close();
        });
      } else {
        this.toursService.addDailyTour(this.dailyTourForm.value).subscribe(dt => {
          this.dialog.close();
        });
      }
    }
  }

  remove() {

    this.matDialog.open(ConfirmationDialogComponent).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.toursService.removeDailyTour({id: this.tour?.meta?.id}).subscribe(dt => {
          this.dialog.close();
        });
      }
    });
  }

  get tourName(): AbstractControl {
    return this.tourName.get('tour_id');
  }

}
