import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {patternValidator} from '../../shared/helpers/pattern-validator';
import {AuthService} from '../../shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EMAIL_PATTERN} from '../../shared/constants/patterns';

import * as jwtDecode from 'jwt-decode';
import {CommonService} from '../../shared/services/common.service';
import {SPINNER_DIAMETER} from '../../shared/constants/settings';
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


    routeSubscription: Subscription;
    loginSubscription: Subscription;

    constructor(
        public _router: Router,
        public _auth: AuthService,
        private _fb: FormBuilder,
        public route: ActivatedRoute,
        public common: CommonService
    ) {
    }

    ngOnInit() {

        this.routeSubscription = this.route.data.subscribe(dt => {
            this.userType = dt['user'];
        });

        // Defining login form fields
        this.loginForm = this._fb.group({
            email: new FormControl(null, {
                validators: [Validators.required, patternValidator(EMAIL_PATTERN)]
            }),
            password: ['', Validators.required],
        });
    }

    login() {
        this.common.formProcessing = true;

        this.loginSubscription = this._auth.login(this.loginForm.value).subscribe(dt => {

            // Saving token to browser local storage
            localStorage.setItem('token', (dt.hasOwnProperty('token') ? dt.token : ''));

            // Gets current user data
            this._auth.userData = jwtDecode(localStorage.getItem('token'));



            // Navigate to the home page
            this._router.navigate([this._auth.checkRoles('admin') ? 'admin/dashboard' : 'partners/dashboard']);
        });
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
        if (this.routeSubscription) {
            this.routeSubscription.unsubscribe();
        }
        if (this.loginSubscription) {
            this.loginSubscription.unsubscribe();
        }
    }


}
