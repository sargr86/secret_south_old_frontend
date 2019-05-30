import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PartnerService} from '../../shared/services/partner.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {CompaniesService} from '../../shared/services/companies.service';

@Component({
    selector: 'app-save-company',
    templateUrl: './save-company.component.html',
    styleUrls: ['./save-company.component.scss']
})
export class SaveCompanyComponent implements OnInit {
    companyForm: FormGroup;
    companyTypes;
    editCase = false;
    redirectUrl = 'admin/companies';
    fields = {
        name: ['', Validators.required],
        type_id: ['', Validators.required]
    };


    constructor(
        private _fb: FormBuilder,
        private _partner: PartnerService,
        private _company: CompaniesService,
        public router: Router,
        private route: ActivatedRoute,
        public auth: AuthService
    ) {
    }

    ngOnInit() {
        this.companyForm = this._fb.group(this.fields);

        this.route.data.subscribe(dt => {

            const company_id = this.route.snapshot.paramMap.get('id');

            if (company_id) {
                this.editCase = true;
            }

            if (this.editCase) {
                this.fields['id'] = [''];
                this.companyForm = this._fb.group(this.fields);
                this.companyForm.patchValue(dt.company);
            }
        });


        this._partner.getTypes().subscribe(d => {
            this.companyTypes = d;
        });
    }

    saveCompany() {
        this._company[this.editCase ? 'update' : 'add'](this.companyForm.value).subscribe(() => {
            this.router.navigate([this.redirectUrl]);
        });
    }

}
