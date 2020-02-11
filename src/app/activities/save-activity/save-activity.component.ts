import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Partner} from '@shared/models/Partner';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {patternValidator} from '@core/helpers/pattern-validator';
import {LATITUDE_PATTERN, LONGITUDE_PATTERN} from '@core/constants/patterns';
import {ACTIVITIES_FOLDER, SPINNER_DIAMETER} from '@core/constants/settings';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '@core/services/common.service';
import {CheckFormDataPipe} from '@shared/pipes/check-form-data.pipe';
import {AuthService} from '@core/services/auth.service';
import {ActivitiesService} from '@core/services/activities.service';
import {CompaniesService} from '@core/services/companies.service';
import {ShowFormMessagePipe} from '@shared/pipes/show-form-message.pipe';
import {ActivityType} from '@shared/models/ActivityType';

@Component({
  selector: 'app-save-activity',
  templateUrl: './save-activity.component.html',
  styleUrls: ['./save-activity.component.scss']
})
export class SaveActivityComponent implements OnInit, OnDestroy {

  @ViewChild('searchAddress')
  public searchElementRef: ElementRef;

  partners: Partner[] = [];
  activityTypes: ActivityType[] = [];
  saveActivityForm: FormGroup;
  activityFields = {
    'name': ['', Validators.required],
    'oldName': [''],
    'lat': ['', [Validators.required, patternValidator(LATITUDE_PATTERN)]],
    'lng': ['', [Validators.required, patternValidator(LONGITUDE_PATTERN)]],
    'address': ['', Validators.required],
    'activity_type_id': ['', Validators.required],
    'company_id': [this.getCompany(), Validators.required]
  };
  editCase = !!this.route.snapshot.paramMap.get('id');
  spinnerDiameter = SPINNER_DIAMETER;
  redirectUrl = (this.auth.checkRoles('admin') ? 'admin' : 'partners') + '/activities/show';

  dropZoneFile: File;
  activityData;
  imgPath;

  options = {types: ['geocode']};
  companies;
  subscriptions: Subscription[] = [];
  formAction = this.editCase ? 'update' : 'add';

  constructor(
    private _activities: ActivitiesService,
    private _fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public common: CommonService,
    private checkFormData: CheckFormDataPipe,
    private _companies: CompaniesService,
    public auth: AuthService,
    private _formMsg: ShowFormMessagePipe,
  ) {

    this.getActivityType();
    this.getCompanies();


  }

  ngOnInit() {

    this.common.dataLoading = true;
    this.subscriptions.push(this.route.data.subscribe(dt => {
      if (this.editCase) {
        this.activityData = dt['activity'];
        this.activityData['oldName'] = dt['activity']['name'];
        this.getRouteData(dt['activity']);
      }
      this.common.dataLoading = false;
    }));

    if (!this.editCase) {
      this.saveActivityForm = this._fb.group(this.activityFields);
    }
  }

  /**
   * Gets activity provider companies list
   */
  getCompanies() {
    this.subscriptions.push(this._companies.get({name: 'activities'}).subscribe(dt => {
      this.companies = dt;
      this.checkFormData.transform('activity provider', this.activityData, this.companies, this.editCase);
    }));
  }

  /**
   * Gets route data passed from resolver
   * @param dt route data
   */
  getRouteData(dt) {
    if (this.editCase) {
      this.activityFields['id'] = '';
      dt['oldName'] = dt['name'];
      console.log(dt, this.activityFields)
      this.saveActivityForm = this._fb.group(this.activityFields);
      this.saveActivityForm.patchValue(dt);
      this.saveActivityForm.controls['address'].disable();
      if (dt['img']) {
        this.imgPath = ACTIVITIES_FOLDER + dt['img'];
      }
    }
    this.common.dataLoading = false;
  }

  /**
   * Resets address and reloads maps api to allow user to select from drop down again
   */
  resetAddress() {
    this.saveActivityForm.patchValue({'address': ''});
    this.saveActivityForm.controls['address'].enable();
  }

  /**
   * Gets tour types list
   */
  getActivityType() {
    this.subscriptions.push(this._activities.getTypes().subscribe((types: any) => {
      this.activityTypes = types;
      if (types.length === 0) {
        this.toastr.info('Please add at least one activity type.', 'No activity types', {timeOut: 0});
      }
    }));
  }

  /**
   * Add or edit a tour
   * @param searchAddress search full address
   */
  saveActivity(searchAddress) {

    if (this.saveActivityForm.valid) {

      // if (!this.dropZoneFile && !this.editCase) {
      //     this.toastr.error('Please select an image to upload', 'No files');
      // } else {
      this.common.formProcessing = true;
      const data = this.saveActivityForm.value;
      const fd = new FormData();
      fd.append('lat', data.lat);
      fd.append('lng', data.lng);
      fd.append('name', data.name);
      fd.append('oldName', data.oldName);
      fd.append('activity_type_id', data.activity_type_id ? data.activity_type_id : '');
      fd.append('company_id', data.company_id ? data.company_id : '');
      fd.append('address', searchAddress.el.nativeElement.value.replace(/\r?\n|\r/g, ''));
      fd.append('upload_image', this.dropZoneFile ? this.dropZoneFile : '');
      if (!this.imgPath) {
        fd.append('img', this.dropZoneFile ? this.dropZoneFile.name : '');
      }
      fd.append('img_path', this.imgPath ? this.imgPath : '');

      if (this.editCase) {
        fd.append('id', data['id']);
      }


      this.subscriptions.push(this._activities[this.formAction](fd).subscribe(() => {
        this._formMsg.transform('activity info', this.editCase, this.redirectUrl);
      }));
      // }
    }

  }


  getFile(e) {
    this.dropZoneFile = e;
  }

  removeSavedImg() {
    this.imgPath = '';
  }

  get nameCtrl() {
    return this.saveActivityForm.get('name');
  }

  get latCtrl() {
    return this.saveActivityForm.get('lat');
  }

  get lngCtrl() {
    return this.saveActivityForm.get('lng');
  }

  get addressCtrl() {
    return this.saveActivityForm.get('address');
  }

  get companyCtrl(): AbstractControl {
    return this.saveActivityForm.get('company_id');
  }


  getCompany() {
    return this.auth.checkRoles('admin') ? '' : this.auth.userData.company.id;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
