import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {CommonService} from '../../shared/services/common.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    dropzoneFile;
    redirectUrl = '/';

    constructor(
        private _fb: FormBuilder,
        public auth: AuthService,
        public common: CommonService,
        public router: Router
    ) {
    }

    ngOnInit() {
        this.registerForm = this._fb.group({
            'first_name': ['', Validators.required],
            'last_name': ['', Validators.required],
            'email': ['', Validators.required],
            'gender': ['', Validators.required],
            'password': ['', Validators.required]
        });
    }

    /**
     * Gets selected image file
     */
    onAddedFile(e) {
        this.dropzoneFile = e;
    }

    /**
     * First name field control getter
     */
    get firstName() {
        return this.registerForm.get(`first_name`);
    }

    /**
     * Last name field control getter
     */
    get lastName(): AbstractControl {
        return this.registerForm.get(`last_name`);
    }

    /**
     * E-mail field getter
     */
    get email(): AbstractControl {
        return this.registerForm.get('email');
    }

    /**
     * Password field getter
     */
    get pass(): AbstractControl {
        return this.registerForm.get('password');
    }

    /**
     * Gets profile image name if exists
     */
    get profileImg(): any {
        return this.auth.userData ? this.auth.userData.profile_img : false;
    }

}
