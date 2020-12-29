import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {
  ACCOMMODATIONS_FOLDER,
  CONFIRM_DIALOG_SETTINGS,
  EDIT_FORM_GALLERY_OPTIONS,
  SPINNER_DIAMETER
} from '@core/constants/global';
import {AccommodationsService} from '@core/services/accommodations.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '@core/services/common.service';
import {ToastrService} from 'ngx-toastr';
import {CheckFormDataPipe} from '@shared/pipes/check-form-data.pipe';
import {Subscription} from 'rxjs';
import {AuthService} from '@core/services/auth.service';
import {CompaniesService} from '@core/services/companies.service';
import {ShowFormMessagePipe} from '@shared/pipes/show-form-message.pipe';
import {Company} from '@shared/models/Company';
import {BuildFormDataPipe} from '@shared/pipes/build-form-data.pipe';
import {ACCOMMODATION_FIELDS} from '@core/helpers/form-fields-getter';
import {RedirectUrlGeneratorPipe} from '@shared/pipes/redirect-url-generator.pipe';
import {COUNTRY_RESTRICTED_PLACES} from '@core/helpers/google-one-country-places-getter';
import {NgxGalleryAction, NgxGalleryOptions} from 'ngx-gallery-9';
import {SubjectService} from '@core/services/subject.service';
import {GetFileBasenamePipe} from '@shared/pipes/get-file-basename.pipe';
import {MarkSelectedCoverImagePipe} from '@shared/pipes/mark-selected-cover-image.pipe';
import SelectImageToMakeCoverOnPageLoad from '@core/helpers/select-image-to-make-cover-on-page-load';
import {ConfirmationDialogComponent} from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Accommodation} from '@shared/models/Accommodation';
import SetImageAsCover from '@core/helpers/set-image-as-cover';
import CheckIfCoverImageWhenRemoving from '@core/helpers/check-if-cover-image-when-removing';

@Component({
  selector: 'app-save-accommodation',
  templateUrl: './save-accommodation.component.html',
  styleUrls: ['./save-accommodation.component.scss']
})
export class SaveAccommodationComponent implements OnInit, OnDestroy, AfterViewInit {

  accommodationForm: FormGroup;
  spinnerDiameter = SPINNER_DIAMETER;
  formFields = ACCOMMODATION_FIELDS;
  subscriptions: Subscription[] = [];
  editCase = !!this.route.snapshot.paramMap.get('id');
  formAction = this.editCase ? 'update' : 'add';
  redirectUrl = this.getRedirectUrl.transform('accommodations');

  companies: Company[] = [];

  @ViewChild('searchAddress') searchAddress;
  searchElementRef: ElementRef;
  options = {types: ['geocode']};

  dropZoneFiles: File[] = [];
  coverPath: string;
  countryRestrictedPlaces = COUNTRY_RESTRICTED_PLACES;

  coverShown = true;

  dropzoneConfig = {
    maxFiles: 10
  };

  accommodationData: Accommodation;
  galleryOptions: NgxGalleryOptions[] = EDIT_FORM_GALLERY_OPTIONS;

  constructor(
    private _accommodation: AccommodationsService,
    private _companies: CompaniesService,
    public router: Router,
    public common: CommonService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private checkFormData: CheckFormDataPipe,
    private _formMsg: ShowFormMessagePipe,
    public auth: AuthService,
    private formData: BuildFormDataPipe,
    private getRedirectUrl: RedirectUrlGeneratorPipe,
    private subject: SubjectService,
    private basename: GetFileBasenamePipe,
    private elRef: ElementRef,
    private markCover: MarkSelectedCoverImagePipe,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {


    this.setFormFields();
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

      // Getting companies list
      this.getCompanies(dt.accommodation);


      // Preparing the edit form for updating info case
      if (this.editCase) {
        this.editFormPreparations(dt.accommodation);
      }

      this.coverShown =  !!this.coverPath;
      this.common.dataLoading = false;

    }));
  }

  makeCover(event, index) {

    const cover = SetImageAsCover.set(event, index, this.accommodationData.images);
    this.coverShown = true;

    if (cover) {
      this.accommodationForm.patchValue({img: cover});
      this.coverPath = cover.big;
      const p = this.basename.transform(this.coverPath);
      this.subscriptions.push(this._accommodation.makeCover({img: p, id: this.accommodationData.id}).subscribe(dt => {
        this.toastr.success('The selected image was set as cover successfully');
      }));
    }
  }

  deleteImage(event, index) {

    this.subscriptions.push(this.dialog.open(ConfirmationDialogComponent, CONFIRM_DIALOG_SETTINGS).afterClosed().subscribe(r => {
      if (r) {
        const currentImg = this.accommodationData.images[index].big;
        if (!CheckIfCoverImageWhenRemoving.check(currentImg, this.coverPath)) {
          this.accommodationData.images = this.accommodationData.images.filter(i => i['big'] !== currentImg);
          this.subscriptions.push(this._accommodation.removeImage({filename: currentImg}).subscribe(dt => {
            this.toastr.success('The selected image was removed successfully');
          }));
        } else {
          this.toastr.error('Please change the cover first.', 'This is the cover image.');
        }
      }
    }));


  }

  /**
   * Removed a drop zone file
   * @param e event
   */
  removeDropzoneImg(e) {
    this.dropZoneFiles = this.dropZoneFiles.filter(f => e.name !== f.name);
  }

  onChange(e) {
    console.log(e)
  }

  /**
   * Prepares edit form fields & data
   * @param dt route data
   */
  editFormPreparations(dt): void {
    console.log(dt)
    this.formFields['id'] = '';
    this.setFormFields();
    this.addressCtrl.disable();
    this.accommodationData = dt;
    this.accommodationData['oldName'] = dt['name'];
    this.accommodationForm.patchValue(dt);
    if (dt['img']) {
      this.coverPath = dt.realFolder + '/' + dt['img'];
    }
  }

  /**
   * Setting form fields with provided object
   */
  setFormFields(): void {
    this.accommodationForm = this._fb.group(this.formFields);
  }


  /**
   * Resets address and reloads maps api to allow user to select from drop down again
   */
  resetAddress(): void {
    this.accommodationForm.patchValue({'address': ''});
    this.addressCtrl.enable();
  }

  /**
   * Gets activity provider companies list
   */
  getCompanies(accommodationData): void {
    this.subscriptions.push(this._companies.get({name: 'accommodation'}).subscribe((dt: Company[]) => {
      this.companies = dt;
      this.checkFormData.transform('accommodation', accommodationData, this.companies, this.editCase);
    }));
  }

  /**
   * Adds/updates food drink info
   * @param address food-drink address
   */
  save(address): void {
    // if (this.accommodationForm.valid) {
    this.common.formProcessing = true;
    const formData = this.formData.transform({
      ...this.accommodationForm.value,
      address: address.el.nativeElement.value
    }, this.dropZoneFiles);

    this.subscriptions.push(this._accommodation[this.formAction](formData).subscribe(() => {
      this._formMsg.transform('accommodation', this.editCase, this.redirectUrl);
    }));
    // }
  }

  getFile(e): void {
    this.dropZoneFiles.push(e);
  }

  removeSavedImg(): void {
    this.coverPath = '';
    this.accommodationForm.patchValue({'img': ''});
  }


  toggleSidebar(action) {
    this.subject.setSidebarAction(action);
  }

  handleAddressChange(e) {
    console.log(e)
  }

  get nameCtrl(): AbstractControl {
    return this.accommodationForm.get('lat');
  }

  get latCtrl(): AbstractControl {
    return this.accommodationForm.get('lat');
  }

  get lngCtrl(): AbstractControl {
    return this.accommodationForm.get('lng');
  }

  get addressCtrl(): AbstractControl {
    return this.accommodationForm.get('address');
  }

  ngAfterViewInit() {
    this.markCover.transform(this.coverPath, this.elRef);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


}
