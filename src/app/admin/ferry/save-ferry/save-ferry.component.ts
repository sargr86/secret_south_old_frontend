import {Component, OnInit} from '@angular/core';
import {FerryService} from '../../services/ferry.service';
import {PartnerService} from '../../services/partner.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SPINNER_DIAMETER} from '../../../shared/constants/settings';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '../../../shared/services/common.service';

@Component({
    selector: 'app-save-ferry',
    templateUrl: './save-ferry.component.html',
    styleUrls: ['./save-ferry.component.scss']
})
export class SaveFerryComponent implements OnInit {

    editFerryForm: FormGroup;
    ferryData;
    spinnerDiameter = SPINNER_DIAMETER;
    partners;
    editCase = false;

    constructor(
        private _fb: FormBuilder,
        private _ferry: FerryService,
        private _partner: PartnerService,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        public common: CommonService
    ) {
    }

    ngOnInit() {
        this.editFerryForm = this._fb.group({
            'id': '',
            'name': ['', Validators.required],
            'email': ['', Validators.required],
            'max_people': ['', Validators.required],
            'min_people': ['', Validators.required],
            'lat': ['', Validators.required],
            'lng': ['', Validators.required],
            'phone': ['', Validators.required],
            'address': ['', Validators.required],
            'type': 'ferry',
            'partner_id': ['', Validators.required]
        });

        this.getPartners();

        const ferry_id = this.route.snapshot.paramMap.get('id');
        if (ferry_id) {
            this.common.dataLoading = true;
            this.editCase = true;
            this._ferry.getOneFerry({id: ferry_id}).subscribe((dt: any) => {
                if (dt && dt.length > 0) {
                    this.ferryData = dt[0];
                    this.editFerryForm.patchValue(dt[0]);
                    this._partner.getAllpartner().subscribe((d: any) => {
                        this.partners = d['result'];
                        this.common.dataLoading = false;
                    });
                } else {
                    this.common.dataLoading = false;
                }
            });
        }


    }

    saveFerry() {
        const formValue = this.editFerryForm.value;
        if (this.editFerryForm.valid) {
            this.common.formProcessing = true;
            if (this.editCase) {
                this._ferry.update(formValue).subscribe(dt => {
                    this.router.navigate(['admin/AllFerry']);
                    this.toastr.success('The ferry info has been updated successfully', 'Updated!');
                    this.common.formProcessing = false;
                });
            } else {
                this._ferry.insertFerry(formValue).subscribe((r: any) => {
                    this.router.navigate(['admin/AllFerry']);
                    this.toastr.success('The ferry info has been added successfully', 'Added!');
                    this.common.formProcessing = false;
                });
            }


        }
    }

    getPartners() {
        this._ferry.getAllpartner().subscribe((d: any) => {
            this.partners = d['result'];
        });
    }

    get ferryForm() {
        return this.editFerryForm;
    }

    get nameCtrl() {
        return this.ferryForm.get('name');
    }

    get emailCtrl() {
        return this.ferryForm.get('email');
    }

    get latCtrl() {
        return this.ferryForm.get('lat');
    }

    get lngCtrl() {
        return this.ferryForm.get('lng');
    }

    get addressCtrl() {
        return this.ferryForm.get('address');
    }

    get phoneCtrl() {
        return this.ferryForm.get('phone');
    }

    get maxCtrl() {
        return this.ferryForm.get('max_people');
    }

    get minCtrl() {
        return this.ferryForm.get('min_people');
    }

}
