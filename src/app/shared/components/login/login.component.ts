import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {patternValidator} from '../../helpers/pattern-validator';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EMAIL_PATTERN} from '../../constants/patterns';

import * as jwtDecode from 'jwt-decode';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    userType: string;

    constructor(
        public _router: Router,
        public _auth: AuthService,
        private _fb: FormBuilder,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {

        this.route.data.subscribe(dt => {
            this.userType = 'admin';
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
        this._auth.login(this.loginForm.value, 'auth').subscribe(dt => {
            // this._router.navigate([`${this.userType}/dashboard`]);
            // Saving token to browser local storage
            localStorage.setItem('token', (dt.hasOwnProperty('token') ? dt.token : ''));

            // Gets current user data
            this._auth.userData = jwtDecode(localStorage.getItem('token'));

            console.log(this._auth.userData)

            // Navigate to the home page
            this._router.navigate([this._auth.checkRoles('admin') ? 'admin/dashboard' : '/']);
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

}