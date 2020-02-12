import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Partner} from '@shared/models/Partner';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {patternValidator} from '@core/helpers/pattern-validator';
import {LATITUDE_PATTERN, LONGITUDE_PATTERN} from '@core/constants/patterns';
import {
  ACTIVITIES_FOLDER,
  CONFIRM_DIALOG_SETTINGS,
  EDIT_FORM_GALLERY_OPTIONS,
  SPINNER_DIAMETER
} from '@core/constants/settings';
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
import {BuildFormDataPipe} from '@shared/pipes/build-form-data.pipe';
import {NgxGalleryOptions} from 'ngx-gallery';
import {SubjectService} from '@core/services/subject.service';
import SelectImageToMakeCoverOnPageLoad from '@core/helpers/select-image-to-make-cover-on-page-load';
import SetImageAsCover from '@core/helpers/set-image-as-cover';
import {ConfirmationDialogComponent} from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import CheckIfCoverImageWhenRemoving from '@core/helpers/check-if-cover-image-when-removing';
import {MatDialog} from '@angular/material/dialog';
import {GetFileBasenamePipe} from '@shared/pipes/get-file-basename.pipe';

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
    'company_id': [this.getCompany(), Validators.required],
    folder: ['activities']
  };
  editCase = !!this.route.snapshot.paramMap.get('id');
  spinnerDiameter = SPINNER_DIAMETER;
  redirectUrl = (this.auth.checkRoles('admin') ? 'admin' : 'partners') + '/activities/show';

  dropZoneFiles: File[] = [];

  activityData;
  coverPath;

  options = {types: ['geocode']};
  companies;
  subscriptions: Subscription[] = [];
  formAction = this.editCase ? 'update' : 'add';

  coverShown = true;

  dropzoneConfig = {
    maxFiles: 10
  };

  galleryOptions: NgxGalleryOptions[] = EDIT_FORM_GALLERY_OPTIONS;

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
    private formData: BuildFormDataPipe,
    private subject: SubjectService,
    private dialog: MatDialog,
    private basename: GetFileBasenamePipe,
  ) {

    this.getActivityType();
    this.getCompanies();

    this.galleryOptions[0].thumbnailActions = [
      {
        icon: 'fa fa-star', onClick: (event: Event, index: number) => {
          SelectImageToMakeCoverOnPageLoad.set(event);
          this.makeCover(event, index);
        }, titleText: 'cover'
      },
      {
        icon: 'fa fa-times-circle',
        onClick: (event: Event, index: number) => {
          this.deleteImage(event, index);
        }, titleText: 'delete'
      }
    ];


  }

  ngOnInit() {

    this.common.dataLoading = true;
    this.subscriptions.push(this.route.data.subscribe(dt => {
      if (this.editCase) {
        this.activityData = dt['activity'];
        this.activityData['oldName'] = dt['activity']['name'];
        this.getRouteData(dt['activity']);
      }
      this.coverShown = !!this.coverPath;
      this.common.dataLoading = false;
    }));

    if (!this.editCase) {
      this.saveActivityForm = this._fb.group(this.activityFields);
    }
  }

  makeCover(event, index) {

    const cover = SetImageAsCover.set(event, index, this.activityData.images);
    this.coverShown = true;

    if (cover) {
      this.saveActivityForm.patchValue({img: cover});
      this.coverPath = cover.big;
      const p = this.basename.transform(this.coverPath);
      this.subscriptions.push(this._activities.makeCover({img: p, id: this.activityData.id}).subscribe(dt => {
        this.toastr.success('The selected image was set as cover successfully');
      }));
    }
  }

  deleteImage(event, index) {

    this.subscriptions.push(this.dialog.open(ConfirmationDialogComponent, CONFIRM_DIALOG_SETTINGS).afterClosed().subscribe(r => {
      if (r) {
        const currentImg = this.activityData.images[index].big;
        if (!CheckIfCoverImageWhenRemoving.check(currentImg, this.coverPath)) {
          this.activityData.images = this.activityData.images.filter(i => i['big'] !== currentImg);
          this.subscriptions.push(this._activities.removeImage({filename: currentImg}).subscribe(dt => {
            this.toastr.success('The selected image was removed successfully');
          }));
        } else {
          this.toastr.error('Please change the cover first.', 'This is the cover image.');
        }
      }
    }));


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
      this.saveActivityForm = this._fb.group(this.activityFields);
      this.saveActivityForm.patchValue(dt);
      this.saveActivityForm.controls['address'].disable();
      if (dt['img']) {
        this.coverPath = dt.realFolder + '/'  +dt['img'];
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
      // fd.append('lat', data.lat);
      // fd.append('lng', data.lng);
      // fd.append('name', data.name);
      // fd.append('oldName', data.oldName);
      // fd.append('activity_type_id', data.activity_type_id ? data.activity_type_id : '');
      // fd.append('company_id', data.company_id ? data.company_id : '');
      // fd.append('address', searchAddress.el.nativeElement.value.replace(/\r?\n|\r/g, ''));
      // fd.append('upload_images', this.dropZoneFiles ? this.dropZoneFiles : '');
      // if (!this.coverPath) {
      //   fd.append('img', this.dropZoneFiles ? this.dropZoneFiles.name : '');
      // }
      // fd.append('img_path', this.coverPath ? this.coverPath : '');
      //
      // if (this.editCase) {
      //   fd.append('id', data['id']);
      // }

      const formData = this.formData.transform({
        ...this.saveActivityForm.value,
        address: searchAddress.el.nativeElement.value
      }, this.dropZoneFiles);


      this.subscriptions.push(this._activities[this.formAction](formData).subscribe(() => {
        this._formMsg.transform('activity info', this.editCase, this.redirectUrl);
      }));
      // }
    }

  }


  getFile(e): void {
    this.dropZoneFiles.push(e);
  }

  removeSavedImg() {
    this.coverPath = '';
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

  toggleSidebar(action) {
    this.subject.setSidebarAction(action);
  }

  onChange(e) {
    console.log(e)
  }

  getCompany() {
    return this.auth.checkRoles('admin') ? '' : this.auth.userData.company.id;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
