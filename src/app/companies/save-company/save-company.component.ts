import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PartnerService} from '@core/services/partner.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '@core/services/auth.service';
import {CompaniesService} from '@core/services/companies.service';
import {ShowFormMessagePipe} from '@shared/pipes/show-form-message.pipe';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-save-company',
    templateUrl: './save-company.component.html',
    styleUrls: ['./save-company.component.scss']
})
export class SaveCompanyComponent implements OnInit, OnDestroy {
    companyForm: FormGroup;
    companyTypes;
    editCase = false;
    redirectUrl = 'admin/companies';
    fields = {
        name: ['', Validators.required],
        type_id: ['', Validators.required]
    };
    subscriptions: Subscription[] = [];


    constructor(
        private _fb: FormBuilder,
        private _partner: PartnerService,
        private _company: CompaniesService,
        public router: Router,
        private route: ActivatedRoute,
        public auth: AuthService,
        private _formMsg: ShowFormMessagePipe
    ) {
    }

    ngOnInit() {
        this.companyForm = this._fb.group(this.fields);

        this.subscriptions.push(this.route.data.subscribe(dt => {

            const company_id = this.route.snapshot.paramMap.get('id');

            if (company_id) {
                this.editCase = true;
            }

            if (this.editCase) {
                this.fields['id'] = [''];
                this.companyForm = this._fb.group(this.fields);
                this.companyForm.patchValue(dt.company);
            }
        }));


        this.subscriptions.push(this._partner.getTypes().subscribe(d => {
            this.companyTypes = d;
        }));
    }

    saveCompany() {
        this.subscriptions.push(this._company[this.editCase ? 'update' : 'add'](this.companyForm.value).subscribe(() => {
            this.router.navigate([this.redirectUrl]);
            this._formMsg.transform('company', this.editCase, this.redirectUrl);
        }));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

}
