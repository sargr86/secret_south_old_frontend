import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FerryService} from '../services/ferry.service';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {SPINNER_DIAMETER} from '../../shared/constants/settings';
import {PartnerService} from '../services/partner.service';

@Component({
    selector: 'app-edit-ferry',
    templateUrl: './edit-ferry.component.html',
    styleUrls: ['./edit-ferry.component.scss']
})
export class EditFerryComponent implements OnInit {
    editFerryForm: FormGroup;
    ferryData;
    dataLoading = false;
    formProcessing = false;
    spinnerDiameter = SPINNER_DIAMETER;
    partnersTypeName = [];
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
            'type': '',
            'partner_id': ''
        });

        this.dataLoading = true;
        this._ferry.getOneFerry({id: this.route.snapshot.paramMap.get('id')}).subscribe((dt: any) => {
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

    updateFerry() {
        if (this.editFerryForm.valid) {
            this.formProcessing = true;
            this._ferry.update(this.editFerryForm.value).subscribe(dt => {
                this.router.navigate(['admin/AllFerry']);
                this.formProcessing = false;
            });
        }
    }

}
