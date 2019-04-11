import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToursService} from '../../services/tours.service';
import {CommonService} from '../../../shared/services/common.service';
import {SPINNER_DIAMETER} from '../../../shared/constants/settings';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-save-tour-type',
    templateUrl: './save-tour-type.component.html',
    styleUrls: ['./save-tour-type.component.scss']
})
export class SaveTourTypeComponent implements OnInit {
    saveTourTypeForm: FormGroup;
    editCase = false;
    redirectUrl = 'admin/all_tours_types';
    spinnerDiameter = SPINNER_DIAMETER;

    constructor(
        private _fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private _tours: ToursService,
        public common: CommonService,
        private toastr: ToastrService
    ) {
    }

    ngOnInit() {
        this.saveTourTypeForm = this._fb.group({
            tour_name: ['', Validators.required],
            id: []
        });
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.common.dataLoading = true;
            this._tours.getOneTourType({id: id}).subscribe((dt: any) => {
                if (dt) {
                    dt['name'] = dt['tour_name'];
                    this.saveTourTypeForm.patchValue(dt);
                    this.editCase = true;
                    this.common.dataLoading = false;
                }
            });
        }
    }

    get nameCtrl() {
        return this.saveTourTypeForm.get('tour_name');
    }

    /**
     * Adds or updates tour type info
     */
    saveToursType() {
        this.common.formProcessing = true;

        if (this.editCase) {
            this._tours.updateToursType(this.saveTourTypeForm.value).subscribe((dt => {
                this.common.formProcessing = false;
                this.router.navigate([this.redirectUrl]);
                this.toastr.success('The tour type info has been updated successfully', 'Updated!');
            }));
        } else {

            this._tours.insertToursType(this.saveTourTypeForm.value).subscribe((r: any) => {
                this.common.formProcessing = false;
                this.router.navigate([this.redirectUrl]);
                this.toastr.success('The tour type info has been added successfully', 'Added!');
            });
        }
    }

}
