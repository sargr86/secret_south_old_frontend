import {Component, Inject, OnInit} from '@angular/core';
import {UsersService} from '@core/services/users.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-driver-assignment-dialog',
  templateUrl: './driver-assignment-dialog.component.html',
  styleUrls: ['./driver-assignment-dialog.component.scss']
})
export class DriverAssignmentDialogComponent implements OnInit {
  drivers;
  driverAssignmentForm: FormGroup;
  selectedDriver;

  constructor(
    private users: UsersService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DriverAssignmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.driverAssignmentForm = this.fb.group({
      order_id: [data.order_id],
      driver: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.users.getUsersByRole({position: 'Driver'}).subscribe(dt => {
      this.drivers = dt;
    });
  }

  changeDriver(e) {
    // console.log(e)
  }

  assignDriver() {
    if (this.driverAssignmentForm.valid) {
      this.dialogRef.close( this.driverAssignmentForm.value);
    }
  }

}
