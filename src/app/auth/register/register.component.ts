import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@core/services/auth.service';
import {CommonService} from '@core/services/common.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SPINNER_DIAMETER, USER_TYPES} from '@core/constants/settings';
import {DROPZONE_CONFIG} from 'ngx-dropzone-wrapper';
import * as jwtDecode from 'jwt-decode';
import {PartnerService} from '@core/services/partner.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {BuildFormDataPipe} from '@shared/pipes/build-form-data.pipe';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  dropzoneFile = [];
  redirectUrl = '/';
  spinnerDiameter = SPINNER_DIAMETER;
  dropzoneConfig = DROPZONE_CONFIG;
  passHidden = false;
  userTypes = USER_TYPES;
  partnerTypes;
  regTokenExpired = false;
  customerRegistration = false;
  formFields = {
    'first_name': ['', Validators.required],
    'last_name': ['', Validators.required],
    'email': ['', Validators.required],
    'gender': ['', Validators.required],
    'password': ['', Validators.required],
    'folder': ['users'],
    'profile_img': [''],
    'company_id': ['', Validators.required],
    'user_type': ['', Validators.required]
  };

  constructor(
    private _fb: FormBuilder,
    public auth: AuthService,
    public common: CommonService,
    public router: Router,
    private _partner: PartnerService,
    private route: ActivatedRoute,
    private jwtHelper: JwtHelperService,
    private buildFormData: BuildFormDataPipe
  ) {
  }

  ngOnInit() {

    if (!this.customerRegistration) {
      this.formFields['field_type'] = ['', Validators.required];
    }

    this.registerForm = this._fb.group(this.formFields);

    this._partner.getTypes().subscribe(d => {
      this.partnerTypes = d;
    });


    // Checking if user token expired and getting user data from token here
    this.route.queryParams.subscribe(dt => {
      const token = dt.token;
      if (token) {

        this.regTokenExpired = this.jwtHelper.isTokenExpired(token);
        const userData = jwtDecode(dt.token);
        this.registerForm.patchValue(userData);
        this.common.dataLoading = false;
        console.log(userData)
      } else {
        this.registerForm.patchValue({user_type: 'customer'});
      }
      this.customerRegistration = !token;
    });
  }

  register() {
    const formData = this.buildFormData.transform(this.registerForm.value, this.dropzoneFile, 'profile_img_file');
    this.common.formProcessing = true;
    this.auth.register(formData).subscribe((dt: any) => {
      // Saving token to browser local storage
      localStorage.setItem('token', (dt.hasOwnProperty('token') ? dt.token : ''));

      // Gets current user data
      this.auth.userData = jwtDecode(localStorage.getItem('token'));

      // Navigate to the home page
      this.router.navigate([this.auth.checkRoles('admin') ? 'admin/dashboard/show' : (this.auth.checkRoles('partner')) ? 'partners/dashboard/show' : 'employees/dashboard/show']);
      this.common.formProcessing = false;
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
    this.dropzoneFile.push(e[0]);
    this.registerForm.patchValue({profile_img: e[0].name});
    console.log(e)
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

  get userType(): AbstractControl {
    return this.registerForm.get('user_type');
  }

  get fieldType(): AbstractControl {
    return this.registerForm.get('field_type');
  }

}
