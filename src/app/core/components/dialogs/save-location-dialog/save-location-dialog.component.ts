import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FerriesService} from '@core/services/ferries.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-save-location-dialog',
  templateUrl: './save-location-dialog.component.html',
  styleUrls: ['./save-location-dialog.component.scss']
})
export class SaveLocationDialogComponent implements OnInit {

  locationForm: FormGroup;
  edit;
  editData;

  constructor(
    private fb: FormBuilder,
    private ferriesService: FerriesService,
    private dialog: MatDialogRef<SaveLocationDialogComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.locationForm = this.fb.group({
      name: ['', [Validators.required]],
      latitude: [''],
      longitude: ['']
    });

    this.edit = data.edit;
    this.editData = data;
    this.locationForm.patchValue(data);

  }

  ngOnInit(): void {
  }

  save() {
    if (this.edit) {
      const formValue = this.locationForm.value;
      formValue.id = this.editData.id;
      this.ferriesService.updateLocation(formValue).subscribe(() => {
        this.dialog.close();
        this.toastr.success('The location details have been updated successfully');
      });
    } else {
      this.ferriesService.addLocation(this.locationForm.value).subscribe(() => {
        this.dialog.close();
        this.toastr.success('The location has been added successfully');
      });
    }
  }

  remove() {
    this.ferriesService.removeLocation({id: this.editData.id}).subscribe(() => {
      this.dialog.close(true);
      this.toastr.success('The location has been removed successfully');
    });
  }

}
