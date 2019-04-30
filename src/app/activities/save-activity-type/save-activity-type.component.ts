import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SPINNER_DIAMETER} from '../../shared/constants/settings';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../shared/services/common.service';
import {ToastrService} from 'ngx-toastr';
import {ActivitiesService} from '../../shared/services/activities.service';

@Component({
    selector: 'app-save-activity-type',
    templateUrl: './save-activity-type.component.html',
    styleUrls: ['./save-activity-type.component.scss']
})
export class SaveActivityTypeComponent implements OnInit {
    activityTypeForm: FormGroup;
    editCase = false;
    redirectUrl = 'admin/all_activities_types';
    spinnerDiameter = SPINNER_DIAMETER;

    constructor(
        private _fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private _activities: ActivitiesService,
        public common: CommonService,
        private toastr: ToastrService
    ) {
    }

    ngOnInit() {
        this.activityTypeForm = this._fb.group({
            name: ['', Validators.required],
            description: [''],
            id: []
        });
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.common.dataLoading = true;
            this._activities.getOneType({id: id}).subscribe((dt: any) => {
                if (dt) {
                    this.activityTypeForm.patchValue(dt);
                    this.editCase = true;
                }
                this.common.dataLoading = false;
            });
        }
    }

    get nameCtrl() {
        return this.activityTypeForm.get('name');
    }

    /**
     * Adds or updates tour type info
     */
    saveToursType() {
        this.common.formProcessing = true;

        if (this.editCase) {
            this._activities.updateType(this.activityTypeForm.value).subscribe((dt => {
                this.common.formProcessing = false;
                this.router.navigate([this.redirectUrl]);
                this.toastr.success('The activity type info has been updated successfully', 'Updated!');
            }));
        } else {

            this._activities.addType(this.activityTypeForm.value).subscribe((r: any) => {
                this.common.formProcessing = false;
                this.router.navigate([this.redirectUrl]);
                this.toastr.success('The activity type info has been added successfully', 'Added!');
            });
        }
    }

}
