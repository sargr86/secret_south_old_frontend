import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FerriesService} from '@core/services/ferries.service';
import {PartnerService} from '@core/services/partner.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ALLOWED_COUNTRIES, CONFIRM_DIALOG_SETTINGS,
  DEFAULT_COUNTRY, EDIT_FORM_GALLERY_OPTIONS,
  FERRIES_FOLDER,
  SPINNER_DIAMETER
} from '@core/constants/global';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '@core/services/common.service';
import {Ferry} from '@shared/models/Ferry';
import {Partner} from '@shared/models/Partner';
import {CheckFormDataPipe} from '@shared/pipes/check-form-data.pipe';
import {Subscription} from 'rxjs';
import {AuthService} from '@core/services/auth.service';
import {Company} from '@shared/models/Company';
import {CompaniesService} from '@core/services/companies.service';
import {ShowFormMessagePipe} from '@shared/pipes/show-form-message.pipe';
import {BuildFormDataPipe} from '@shared/pipes/build-form-data.pipe';
import {FERRY_FIELDS} from '@core/helpers/form-fields-getter';
import {RedirectUrlGeneratorPipe} from '@shared/pipes/redirect-url-generator.pipe';
import {DropzoneConfig} from 'ngx-dropzone-wrapper';
import {NgxGalleryOptions} from 'ngx-gallery-9';
import {SubjectService} from '@core/services/subject.service';
import {GetFileBasenamePipe} from '@shared/pipes/get-file-basename.pipe';
import {MarkSelectedCoverImagePipe} from '@shared/pipes/mark-selected-cover-image.pipe';
import SelectImageToMakeCoverOnPageLoad from '@core/helpers/select-image-to-make-cover-on-page-load';
import {ConfirmationDialogComponent} from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import SetImageAsCover from '@core/helpers/set-image-as-cover';
import CheckIfCoverImageWhenRemoving from '@core/helpers/check-if-cover-image-when-removing';


@Component({
  selector: 'app-save-ferry',
  templateUrl: './save-ferry.component.html',
  styleUrls: ['./save-ferry.component.scss']
})
export class SaveFerryComponent implements OnInit, AfterViewInit, OnDestroy {

  ferryForm: FormGroup;
  ferryData: Ferry;
  spinnerDiameter = SPINNER_DIAMETER;
  partners: Partner[] = [];
  editCase = false;
  redirectUrl = this.getRedirectUrl.transform('ferries');
  allowedCountries = ALLOWED_COUNTRIES;
  defaultCountry = DEFAULT_COUNTRY;
  options = {types: ['geocode']};
  ferryFields = FERRY_FIELDS;
  dropZoneFiles = [];
  coverPath;
  formAction: string;
  dropzoneIndividualConfig = {maxFiles: 5};
  coverShown = true;
  galleryOptions: NgxGalleryOptions[] = EDIT_FORM_GALLERY_OPTIONS;

  companies: Company[] = [];
  subscriptions: Subscription[] = [];

  @ViewChild('searchAddress')
  public searchElementRef: ElementRef;


  constructor(
    private fb: FormBuilder,
    private _ferries: FerriesService,
    private _partner: PartnerService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public common: CommonService,
    private checkFormData: CheckFormDataPipe,
    private _companies: CompaniesService,
    public auth: AuthService,
    private _formMsg: ShowFormMessagePipe,
    private formData: BuildFormDataPipe,
    private getRedirectUrl: RedirectUrlGeneratorPipe,
    private subject: SubjectService,
    private basename: GetFileBasenamePipe,
    private elRef: ElementRef,
    private markCover: MarkSelectedCoverImagePipe,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.ferryForm = this.fb.group(this.ferryFields);
    this.common.dataLoading = true;

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


    this.subscriptions.push(this.route.data.subscribe(dt => {
      this.getCompanies();
      if (this.route.snapshot.paramMap.get('id')) {
        this.ferryData = dt['oneFerry'];
        this.ferryData['oldName'] = dt['oneFerry']['name'];
        this.ferryFields['id'] = '';
        this.ferryForm = this.fb.group(this.ferryFields);
        this.editCase = true;
        if (this.ferryData) {
          this.ferryForm.patchValue(this.ferryData);
          this.addressCtrl.disable();
        }

        if (this.ferryData['img']) {
          this.coverPath = this.ferryData['realFolder'] + '/' + this.ferryData['img'];
        }
      }
      this.formAction = this.editCase ? 'update' : 'add';
      this.coverShown = !!this.coverPath;
      this.common.dataLoading = false;
    }));

  }

  /**
   * Resets address and reloads maps api to allow user to select from drop down again
   */
  resetAddress() {
    this.ferryForm.patchValue({'address': ''});
    this.addressCtrl.enable();
  }

  /**
   * Adds or updates a ferry info
   * @param address ferry address
   */
  saveFerry(address) {

    this.common.formProcessing = true;
    const formData = this.formData.transform({
      ...this.ferryForm.value,
      address: address.el.nativeElement.value.replace(/\r?\n|\r/g, '')
    }, this.dropZoneFiles);


    // if (this.ferryForm.valid) {
    this.subscriptions.push(this._ferries[this.formAction](formData).subscribe(() => {
      this._formMsg.transform('ferry', this.editCase, this.redirectUrl);
    }));


    // }
  }

  /**
   * Gets ferry companies list
   */
  getCompanies() {
    this.subscriptions.push(this._companies.get({name: 'ferries'}).subscribe((dt: Company[]) => {
      this.companies = dt;
      this.checkFormData.transform('ferry', this.ferryData, this.companies, this.editCase);
    }));
  }

  /**
   * Gets drop zone file
   * @param e the file
   */
  getFiles(e) {
    this.dropZoneFiles.push(e);
  }

  deleteImage(event, index) {

    this.dialog.open(ConfirmationDialogComponent, CONFIRM_DIALOG_SETTINGS).afterClosed().subscribe(r => {
      if (r) {
        const currentImg = this.ferryData.images[index].big;
        if (!CheckIfCoverImageWhenRemoving.check(currentImg, this.coverPath)) {
          this.ferryData.images = this.ferryData.images.filter(i => i['big'] !== currentImg);
          this._ferries.removeImage({filename: currentImg}).subscribe(dt => {
            this.toastr.success('The selected image was removed successfully');
          });
        } else {
          this.toastr.error('Please change the cover first.', 'This is the cover image.');
        }
      }
    });


  }

  /**
   * Removed a drop zone file
   * @param e event
   */
  removeDropzoneImg(e) {
    this.dropZoneFiles = this.dropZoneFiles.filter(f => e.name !== f.name);
  }


  /**
   * Removes saved drop zone image
   */
  removeSavedImg() {
    this.coverPath = '';
    this.ferryForm.patchValue({'img': ''});
  }

  /**
   * Marks the selected image as cover
   * @param event
   * @param index
   */
  makeCover(event, index) {

    const cover = SetImageAsCover.set(event, index, this.ferryData.images);
    this.coverShown = true;
    if (cover) {
      this.coverPath = cover['big'];
      const p = this.coverPath.split('/').pop();
      this._ferries.makeCover({img: p, id: this.ferryData.id}).subscribe(dt => {
        this.toastr.success('The selected image was set as cover successfully');
      });
    }
  }

  getCompany() {
    return this.auth.checkRoles('admin') ? '' : this.auth.userData.company.id;
  }


  changed(e) {
    this.ferryForm.patchValue({'phone': e.target.value});
  }

  get nameCtrl() {
    return this.ferryForm.get('name');
  }

  get latCtrl() {
    return this.ferryForm.get('lat');
  }

  get lngCtrl() {
    return this.ferryForm.get('lng');
  }

  get addressCtrl() {
    return this.ferryForm.get('address');
  }

  get phoneCtrl() {
    return this.ferryForm.get('phone');
  }

  get maxCtrl() {
    return this.ferryForm.get('max_people');
  }

  get minCtrl() {
    return this.ferryForm.get('min_people');
  }

  get companyCtrl(): AbstractControl {
    return this.ferryForm.get('company_id');
  }

  toggleSidebar(action) {
    this.subject.setSidebarAction(action);
  }

  ngAfterViewInit() {

    // Marks the cover image on page load
    this.markCover.transform(this.coverPath, this.elRef);
  }

  getSelectedCover(e, index) {

  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
