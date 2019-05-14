import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {CommonService} from '../../shared/services/common.service';
import {Router} from '@angular/router';
import {SPINNER_DIAMETER} from '../../shared/constants/settings';
import {DROPZONE_CONFIG} from 'ngx-dropzone-wrapper';
import * as jwtDecode from 'jwt-decode';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    dropzoneFile;
    redirectUrl = '/';
    spinnerDiameter = SPINNER_DIAMETER;
    dropzoneConfig = DROPZONE_CONFIG;
    passHidden = false;
    userTypes = ['partner', 'employee'];

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
            'password': ['', Validators.required],
            'user_type': ['']
        });
    }

    register() {
        const formData = this.getFormData();
        this.auth.register(formData).subscribe((dt: any) => {
            // Saving token to browser local storage
            localStorage.setItem('token', (dt.hasOwnProperty('token') ? dt.token : ''));

            // Gets current user data
            this.auth.userData = jwtDecode(localStorage.getItem('token'));


            // Navigate to the home page
            this.router.navigate([this.auth.checkRoles('admin') ? 'admin/dashboard' : (this.auth.checkRoles('partner')) ? 'partners/dashboard' : 'employees/dashboard']);
        });
    }


    getFormData() {
        const formData = new FormData();
        for (const field in this.registerForm.value) {
            formData.append(field, this.registerForm.value[field]);
        }
        const files = this.dropzoneFile;
        if (files && files.length > 0) {
            files.map(file => {
                if (file['name']) {
                    const nameArr = file['name'].split('.');
                    const fileName = `${nameArr[0]}.${nameArr[1]}`;
                    formData.append('profile_img', fileName);
                    formData.append('profile_img_file', file, fileName);
                }

            });
        }
        return formData;
    }

    removeImage() {

    }

    /**
     * Gets selected image file
     */
    onAddedFile(e) {
        this.dropzoneFile = e;
    }

    togglePass() {
        this.passHidden = !this.passHidden;
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
