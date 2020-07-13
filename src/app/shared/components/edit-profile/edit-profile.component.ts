import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SPINNER_DIAMETER, STRIPE_CARD_OPTIONS} from '@core/constants/global';
import {DROPZONE_CONFIG} from 'ngx-dropzone-wrapper';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '@core/services/common.service';
import {AuthService} from '@core/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import { StripeCardComponent, StripeService} from 'ngx-stripe';
import {UsersService} from '@core/services/users.service';
import * as jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  profileForm: FormGroup;
  userData;
  dropzoneFile = {};
  spinnerDiameter = SPINNER_DIAMETER;
  redirectUrl;
  dropzoneConfig = DROPZONE_CONFIG;
  authUser;

  // Stripe
  cardOptions = STRIPE_CARD_OPTIONS;
  elementsOptions = {locale: 'en'};
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    public common: CommonService,
    public router: Router,
    public auth: AuthService,
    private toastr: ToastrService,
    private stripeService: StripeService,
    private usersService: UsersService
  ) {
    this.profileForm = this._fb.group({
      'first_name': ['', Validators.required],
      'last_name': ['', Validators.required],
      // 'gender': ['', Validators.required],
      'email': ['', Validators.required],
      'id': [''],
      'profile_img': [''],
      folder: ['users']
    });
  }

  ngOnInit() {


    const token = localStorage.getItem('token');
    if (token) {
      this.authUser = jwtDecode(token);
    }

    this.common.dataLoading = false;

    // Setting all the received fields of the form
    this.setFormFields();

    this.getRedirectUrl();

    this.getUserCards();
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
        const value = this.profileForm.value[field] ? this.profileForm.value[field] : '';
        formData.append(field, value);
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
      this.router.navigate([this.redirectUrl]);
      this.toastr.success('The profile has been updated successfully');
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

  addUserWithCard() {
    const fullName = this.authUser.full_name;
    this.stripeService
      .createToken(this.card.getCard(), {name: fullName})
      .subscribe(result => {
        console.log(result)
        if (result.token) {
          const cardData = result.token.card;
          console.log(result.token.id);
          this.usersService.createStripeCard({
            stripeToken: result.token.id,
            stripeEmail: this.authUser.email,
            holderName: fullName,
            user_id: this.authUser.id,
            exp_month: cardData.exp_month,
            exp_year: cardData.exp_year,
            last4: cardData.last4,
            brand: cardData.brand,
            country: cardData.country
          }).subscribe(dt => {

          });
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

  /**
   * Gets selected image file
   */
  onAddedFile(e) {
    this.dropzoneFile = e;
  }

  getUserCards() {
    this.usersService.getUserCards({user_id: this.authUser.id}).subscribe(dt => {

    });
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

  /**
   * Gets redirect url
   */
  getRedirectUrl() {
    this.redirectUrl = (this.auth.checkRoles('partner') ? 'partners' : (this.auth.checkRoles('admin') ? 'admin' : 'employees')) + '/dashboard/show';
  }


}
