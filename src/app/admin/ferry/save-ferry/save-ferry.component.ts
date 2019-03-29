import {Component, OnInit} from '@angular/core';
import {FerryService} from '../../services/ferry.service';
import {PartnerService} from '../../services/partner.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SPINNER_DIAMETER} from '../../../shared/constants/settings';

@Component({
    selector: 'app-save-ferry',
    templateUrl: './save-ferry.component.html',
    styleUrls: ['./save-ferry.component.scss']
})
export class SaveFerryComponent implements OnInit {

    editFerryForm: FormGroup;
    ferryData;
    dataLoading = false;
    formProcessing = false;
    spinnerDiameter = SPINNER_DIAMETER;
    partners = [];
    partners;
    editCase = false;

    constructor(
        private _fb: FormBuilder,
        private _ferry: FerryService,
        private _partner: PartnerService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.editFerryForm = this._fb.group({
            'id': '',
            'name': '',
            'email': '',
            'max_people': '',
            'min_people': '',
            'lat': '',
            'lng': '',
            'phone': '',
            'address': '',
            'type': 'ferry',
            'partner_id': ''
        });

        this.getPartners();

        const ferry_id = this.route.snapshot.paramMap.get('id');
        if (ferry_id) {
            this.dataLoading = true;
            this.editCase = true;
            this._ferry.getOneFerry({id: ferry_id}).subscribe((dt: any) => {
                if (dt && dt.length > 0) {
                    this.ferryData = dt[0];
                    this.editFerryForm.patchValue(dt[0]);
                    this._partner.getAllpartner().subscribe((d: any) => {
                        this.partners = d['result'];
                        this.dataLoading = false;
                    });
                } else {
                    this.dataLoading = false;
                }
            });
        }


    }

    saveFerry() {
        const formValue = this.editFerryForm.value;
        if (this.editFerryForm.valid) {
            this.formProcessing = true;
            if (this.editCase) {
                this._ferry.update(formValue).subscribe(dt => {
                    this.router.navigate(['admin/AllFerry']);
                    this.formProcessing = false;
                });
            } else {
                this._ferry.insertFerry(formValue).subscribe((r: any) => {
                    this.router.navigate(['admin/AllFerry']);
                    this.formProcessing = false;
                });
            }


        }
    }

    getPartners() {
        this._ferry.getAllpartner().subscribe((d: any) => {
            this.partners = d['result'];
        });
    }

}
