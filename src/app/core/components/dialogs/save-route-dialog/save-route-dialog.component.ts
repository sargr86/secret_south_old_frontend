import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FerriesService} from '@core/services/ferries.service';

@Component({
  selector: 'app-save-route-dialog',
  templateUrl: './save-route-dialog.component.html',
  styleUrls: ['./save-route-dialog.component.scss']
})
export class SaveRouteDialogComponent implements OnInit {

  saveRouteForm: FormGroup;
  locations;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private ferriesService: FerriesService,
    private dialog: MatDialogRef<SaveRouteDialogComponent>
  ) {
    this.saveRouteForm = this.fb.group({
      name: ['', Validators.required],
      start_point: ['', Validators.required],
      stop_1: ['', Validators.required],
      stop_2: ['', Validators.required],
      end_point: ['', Validators.required],
      geometry_type: ['LineString'],
      // price: [''],
      coordinates: [data.coordinates]
    });
  }

  ngOnInit(): void {
    this.ferriesService.getLocations().subscribe(dt => {
      this.locations = dt;
    });
  }

  saveRoute() {
    this.ferriesService.addRoutePrice(this.saveRouteForm.value).subscribe(dt => {
      this.dialog.close(dt);
    });
  }

}
