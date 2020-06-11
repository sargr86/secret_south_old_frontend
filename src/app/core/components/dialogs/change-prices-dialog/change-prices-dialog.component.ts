import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DriverAssignmentDialogComponent} from '@core/components/dialogs/driver-assignment-dialog/driver-assignment-dialog.component';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FerriesService} from '@core/services/ferries.service';

@Component({
  selector: 'app-change-prices-dialog',
  templateUrl: './change-prices-dialog.component.html',
  styleUrls: ['./change-prices-dialog.component.scss']
})
export class ChangePricesDialogComponent implements OnInit {
  changePricesForm: FormGroup;
  locations;
  allRoutes;

  constructor(
    private dialogRef: MatDialogRef<DriverAssignmentDialogComponent>,
    private ferriesService: FerriesService,
    private fb: FormBuilder,
    private dialog: MatDialogRef<ChangePricesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ferriesService.getLocations().subscribe(dt => {
      this.locations = dt;
    });

    this.ferriesService.getAllRoutes().subscribe(dt => {
      this.allRoutes = dt;
    });

    this.changePricesForm = this.fb.group({
      start_point: ['', Validators.required],
      stop_1: ['', Validators.required],
      stop_2: ['', Validators.required],
      end_point: ['', Validators.required],
      coordinates: [null],
      single: ['', Validators.required],
      return: ['', Validators.required],
      total: new FormControl({value: '', disabled: true}, Validators.required),
    });
    this.changePricesForm.patchValue(data);
    console.log(this.changePricesForm.value)
  }

  ngOnInit(): void {

  }

  saveRouteDetails() {
    console.log(this.changePricesForm.value)
    this.ferriesService.saveRoutePrice(this.changePricesForm.value).subscribe(dt => {
      this.dialog.close(dt);
    });
  }

  useRouteCoordinates(e) {
    console.log(e)
    const routeName = e.source.selected._element.nativeElement.innerText;
    const selectedRoute = this.allRoutes.find(r => r.name === routeName);
    this.changePricesForm.patchValue({coordinates: selectedRoute.coordinates});
  }
  get coordinates(): AbstractControl {
    return this.changePricesForm.get('coordinates');
  }


}
