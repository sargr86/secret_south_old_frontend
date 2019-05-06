import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../shared/services/common.service';
import {SPINNER_DIAMETER} from '../../shared/constants/settings';
import {AuthService} from '../../shared/services/auth.service';
import {DROPZONE_CONFIG, DropzoneConfig} from 'ngx-dropzone-wrapper';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

    profileForm: FormGroup;
    userData;
    dropzoneFile = {};
    spinnerDiameter = SPINNER_DIAMETER;
    redirectUrl = 'admin/dashboard';
    dropzoneConfig = DROPZONE_CONFIG;

    constructor(
        private _fb: FormBuilder,
        private _route: ActivatedRoute,
        public common: CommonService,
        public router: Router,
        public auth: AuthService
    ) {
        this.profileForm = this._fb.group({
            'first_name': ['', Validators.required],
            'last_name': ['', Validators.required],
            // 'gender': ['', Validators.required],
            'email': ['', Validators.required],
            'id': [''],
            'profile_img': ['']
        });
    }

    ngOnInit() {

        // Setting all the received fields of the form
        this.setFormFields();
    }

    /**
     * Sets the register/profile edit form fields
     */
    setFormFields() {

        // Getting route data
        this._route.data.subscribe(dt => {
            this.userData = dt.user;
            this.profileForm.patchValue(this.userData);
        });
    }

    /**
     * Builds formData with form fields value and drop zone file
     */
    buildFormData() {
        const formData: FormData = new FormData();
        const formValue = this.profileForm.value;
        const dropFileExist = Object.entries(this.dropzoneFile).length > 0;

        for (const field in this.profileForm.value) {
            if (field === 'birthday') {
                if (formValue['birthday']) {
                    formData.append(field, this.profileForm.value[field]);
                }
            } else if (field !== 'profile_img' || !dropFileExist) {
                formData.append(field, this.profileForm.value[field]);
            }
        }

        // If drop zone file exists saving it to formData object as well
        if (dropFileExist) {

            const file = this.dropzoneFile[0];

            const nameArr = file['name'].split('.');
            const fileName = `${nameArr[0]}.${nameArr[1]}`;
            formData.append('profile_img', fileName);
            formData.append('profile_img_file', file, fileName);
        }

        return formData;
    }

    save() {
        const formData = this.buildFormData();
        this.auth.update(formData).subscribe(dt => {
            this.router.navigate([this.redirectUrl])
        });
    }

    /**
     * Removes user profile image
     */
    removeImage() {
        this.userData.profile_img = '';
        this.dropzoneFile = {};
        this.profileForm.controls['profile_img'].patchValue('');
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
        return this.profileForm.get(`first_name`);
    }

    /**
     * Last name field control getter
     */
    get lastName(): AbstractControl {
        return this.profileForm.get(`last_name`);
    }

    /**
     * E-mail field getter
     */
    get email(): AbstractControl {
        return this.profileForm.get('email');
    }

    /**
     * Password field getter
     */
    get pass(): AbstractControl {
        return this.profileForm.get('password');
    }

    /**
     * Gets profile image name if exists
     */
    get profileImg(): any {
        return this.userData ? this.userData.profile_img : false;
    }

}
