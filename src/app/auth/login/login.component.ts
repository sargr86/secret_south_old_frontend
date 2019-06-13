import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {patternValidator} from '../../shared/helpers/pattern-validator';
import {AuthService} from '../../shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EMAIL_PATTERN} from '../../shared/constants/patterns';

import * as jwtDecode from 'jwt-decode';
import {CommonService} from '../../shared/services/common.service';
import {SPINNER_DIAMETER, USER_TYPES} from '../../shared/constants/settings';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    userType: string;
    spinnerDiameter = SPINNER_DIAMETER;

    subscriptions: Subscription[] = [];

    constructor(
        public _router: Router,
        public _auth: AuthService,
        private _fb: FormBuilder,
        public route: ActivatedRoute,
        public common: CommonService
    ) {
    }

    ngOnInit() {

        this.subscriptions.push(this.route.data.subscribe(dt => {
            this.userType = dt['user'];
        }));

        // Defining login form fields
        this.loginForm = this._fb.group({
            email: new FormControl(null, {
                validators: [Validators.required, patternValidator(EMAIL_PATTERN)]
            }),
            password: ['', Validators.required],
        });
    }

    /**
     * Authenticate user
     */
    login() {
        this.common.formProcessing = true;

        this.subscriptions.push(this._auth.login(this.loginForm.value).subscribe(dt => {

            // Saving token to browser local storage
            localStorage.setItem('token', (dt.hasOwnProperty('token') ? dt.token : ''));

            // Gets current user data
            this._auth.userData = jwtDecode(localStorage.getItem('token'));

            // Getting redirect url part matching current user role
            const currentRole = this._auth.userData.role.name_en.toLowerCase();
            const userType = USER_TYPES.find(d => d.role === currentRole);

            // Navigate to the dashboard page
            this._router.navigate([`${userType ? userType.label : 'admin'}/dashboard`]);

        }));
    }

    /**
     * E-mail field getter
     */
    get email(): AbstractControl {
        return this.loginForm.get('email');
    }

    /**
     * Password field getter
     */
    get pass(): AbstractControl {
        return this.loginForm.get('password');
    }

    ngOnDestroy() {
        this.common.formProcessing = false;
        this.subscriptions.forEach(s => s.unsubscribe());
    }


}
