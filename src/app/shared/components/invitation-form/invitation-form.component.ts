import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '@core/services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SPINNER_DIAMETER, USER_TYPES} from '@core/constants/settings';
import {AuthService} from '@core/services/auth.service';
import {PartnerService} from '@core/services/partner.service';
import {EmployeesService} from '@core/services/employees.service';
import {ToastrService} from 'ngx-toastr';
import {CompaniesService} from '@core/services/companies.service';

@Component({
    selector: 'app-invitation-form',
    templateUrl: './invitation-form.component.html',
    styleUrls: ['./invitation-form.component.scss']
})
export class InvitationFormComponent implements OnInit {
    invitationForm: FormGroup;
    spinnerDiameter = SPINNER_DIAMETER;
    redirectUrl;
    userType;
    partnerTypes;
    companies;
    fields = {
        'first_name': ['', Validators.required],
        'last_name': ['', Validators.required],
        'gender': ['', Validators.required],
        'email': ['', Validators.required],
        'field_type': ['', Validators.required],
        'company_id': [this.getCompany(), Validators.required]
    };

    constructor(
        private _fb: FormBuilder,
        public common: CommonService,
        public router: Router,
        public auth: AuthService,
        private _partners: PartnerService,
        private _employees: EmployeesService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private _companies: CompaniesService
    ) {
    }

    ngOnInit() {
        this.invitationForm = this._fb.group(this.fields);

        this._partners.getTypes().subscribe(d => {
            this.partnerTypes = d;
        });

        this._companies.get().subscribe(dt => {
            this.companies = dt;
        });

        this.route.data.subscribe(dt => {
            this.userType = dt.user_type;
            // if (this.auth.checkRoles('admin')) {
            this.fields['user_type'] = [this.userType, Validators.required];
            const userType = USER_TYPES.filter(t => t['role'] === this.userType);
            this.invitationForm = this._fb.group(this.fields);
            if (this.auth.checkRoles('admin')) {
                this.redirectUrl = 'admin/' + userType[0]['label'] + '/show';
            } else {
                this.redirectUrl = 'partners/' + userType[0]['label'] + '/show';
            }
            // }
        });
    }

    getCompany() {
        return this.auth.checkRoles('admin') ? '' : this.auth.userData.company.id;
    }

    /**
     * Changes business type and gets corresponding companies list
     * @param e mat select change event
     */
    changeBusinessType(e) {
        if (this.auth.checkRoles('admin')) {

            this._companies.getCompaniesByBusinessType({type_id: e.id}).subscribe(dt => {
                this.companies = dt;
            });
        }
    }

    get firstNameCtrl() {
        return this.invitationForm.get('first_name');
    }

    get lastNameCtrl() {
        return this.invitationForm.get('last_name');
    }

    get emailCtrl() {
        return this.invitationForm.get('email');
    }

    get fieldType(): AbstractControl {
        return this.invitationForm.get('field_type');
    }

    get companyCtrl(): AbstractControl {
        return this.invitationForm.get('company_id');
    }

    /**
     * Inviting a partner/employee
     */
    invite() {
        const userType = USER_TYPES.filter(t => t['role'] === this.invitationForm.value['user_type']);

        if (userType.length > 0) {
            this.common.formProcessing = true;
            const type = userType[0]['label'];

            this[`_${type}`].invite(this.invitationForm.value).subscribe(dt => {
                this.toastr.success('The invitation has been sent successfully');
                this.redirectUrl = (this.auth.checkRoles('admin') ? 'admin/' : 'partners/') + type;
                this.router.navigate([this.redirectUrl]);
                this.common.formProcessing = false;
            });
        }

    }

}
