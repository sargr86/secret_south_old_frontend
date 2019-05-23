import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../services/common.service';
import {Router} from '@angular/router';
import {SPINNER_DIAMETER, USER_TYPES} from '../../constants/settings';
import {AuthService} from '../../services/auth.service';
import {PartnerService} from '../../services/partner.service';
import {EmployeesService} from '../../services/employees.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-invitation-form',
    templateUrl: './invitation-form.component.html',
    styleUrls: ['./invitation-form.component.scss']
})
export class InvitationFormComponent implements OnInit {
    invitationForm: FormGroup;
    spinnerDiameter = SPINNER_DIAMETER;
    redirectUrl;
    userTypes = USER_TYPES;
    partnerTypes;
    fields = {
        'first_name': ['', Validators.required],
        'last_name': ['', Validators.required],
        'email': ['', Validators.required],
        'field_type': ['', Validators.required],
    };

    constructor(
        private _fb: FormBuilder,
        public common: CommonService,
        public router: Router,
        public auth: AuthService,
        private _partners: PartnerService,
        private _employees: EmployeesService,
        private toastr: ToastrService
    ) {
    }

    ngOnInit() {
        this.invitationForm = this._fb.group(this.fields);
        if (this.auth.checkRoles('admin')) {
            this.fields['user_type'] = ['', Validators.required];
            this.invitationForm = this._fb.group(this.fields);
        }
        this._partners.getTypes().subscribe(d => {
            this.partnerTypes = d;
        });
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

    invite() {
        const userType = this.invitationForm.value['user_type'];
        this.common.formProcessing = true;
        this[`_${userType}`].invite(this.invitationForm.value).subscribe(dt => {
            this.toastr.success('The invitation has been sent successfully');
            this.redirectUrl = (this.auth.checkRoles('admin') ? 'admin/' : 'partners/') + userType;
            this.router.navigate([this.redirectUrl]);
            this.common.formProcessing = false;
        });

    }

}
