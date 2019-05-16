import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../services/common.service';
import {Router} from '@angular/router';
import {SPINNER_DIAMETER, USER_TYPES} from '../../constants/settings';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-invitation-form',
    templateUrl: './invitation-form.component.html',
    styleUrls: ['./invitation-form.component.scss']
})
export class InvitationFormComponent implements OnInit {
    invitationForm: FormGroup;
    spinnerDiameter = SPINNER_DIAMETER;
    redirectUrl = this.auth.checkRoles('admin') ? 'admin/employees' : 'partners/employees';
    userTypes = USER_TYPES;
    fields = {
        'first_name': ['', Validators.required],
        'last_name': ['', Validators.required],
        'email': ['', Validators.required],
    };

    constructor(
        private _fb: FormBuilder,
        public common: CommonService,
        public router: Router,
        public auth: AuthService
    ) {
    }

    ngOnInit() {
        this.invitationForm = this._fb.group(this.fields);
        if (this.auth.checkRoles('admin')) {
            this.fields['user_type'] = ['', Validators.required];
            this.invitationForm = this._fb.group(this.fields);
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

    invitePartner() {

    }

}
