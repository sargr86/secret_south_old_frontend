import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DriverAssignmentDialogComponent} from '@core/components/dialogs/driver-assignment-dialog/driver-assignment-dialog.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FerriesService} from '@core/services/ferries.service';

@Component({
  selector: 'app-change-prices-dialog',
  templateUrl: './change-prices-dialog.component.html',
  styleUrls: ['./change-prices-dialog.component.scss']
})
export class ChangePricesDialogComponent implements OnInit {
  changePricesForm: FormGroup;
  locations;

  constructor(
    private dialogRef: MatDialogRef<DriverAssignmentDialogComponent>,
    private ferriesService: FerriesService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ferriesService.getLocations().subscribe(dt => {
      this.locations = dt;
    });

    this.changePricesForm = this.fb.group({
      start_point: ['', Validators.required],
      stop_1: ['', Validators.required],
      stop_2: ['', Validators.required],
      end_point: ['', Validators.required],
      single: ['', Validators.required],
      return: ['', Validators.required],
      total: new FormControl({value: '', disabled: true}, Validators.required),
    });

    this.changePricesForm.patchValue(data);
  }

  ngOnInit(): void {

  }

  saveRouteDetails() {

  }

}
