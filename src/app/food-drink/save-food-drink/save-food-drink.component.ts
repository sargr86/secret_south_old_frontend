import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FoodDrinkService} from '@core/services/food-drink.service';
import {CommonService} from '@core/services/common.service';
import {
  CONFIRM_DIALOG_SETTINGS,
  EDIT_FORM_GALLERY_OPTIONS,
  FERRIES_FOLDER,
  FOOD_DRINK_FOLDER,
  SPINNER_DIAMETER
} from '@core/constants/settings';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CheckFormDataPipe} from '@shared/pipes/check-form-data.pipe';
import {Subscription} from 'rxjs';
import {AuthService} from '@core/services/auth.service';
import {Company} from '@shared/models/Company';
import {CompaniesService} from '@core/services/companies.service';
import {FoodDrink} from '@shared/models/FoodDrink';
import {FOOD_DRINK_FIELDS} from '@core/helpers/form-fields-getter';
import {RedirectUrlGeneratorPipe} from '@shared/pipes/redirect-url-generator.pipe';
import {ShowFormMessagePipe} from '@shared/pipes/show-form-message.pipe';
import {BuildFormDataPipe} from '@shared/pipes/build-form-data.pipe';
import {NgxGalleryOptions} from 'ngx-gallery';
import {SubjectService} from '@core/services/subject.service';
import SelectImageToMakeCoverOnPageLoad from '@core/helpers/select-image-to-make-cover-on-page-load';
import {MarkSelectedCoverImagePipe} from '@shared/pipes/mark-selected-cover-image.pipe';
import {ConfirmationDialogComponent} from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import SetImageAsCover from '@core/helpers/set-image-as-cover';
import {GetFileBasenamePipe} from '@shared/pipes/get-file-basename.pipe';
import CheckIfCoverImageWhenRemoving from '@core/helpers/check-if-cover-image-when-removing';

@Component({
  selector: 'app-save-food-drink',
  templateUrl: './save-food-drink.component.html',
  styleUrls: ['./save-food-drink.component.scss']
})
export class SaveFoodDrinkComponent implements OnInit, OnDestroy, AfterViewInit {
  foodDrinkForm: FormGroup;
  spinnerDiameter = SPINNER_DIAMETER;
  foodDrinkData: FoodDrink;
  formFields = FOOD_DRINK_FIELDS;
  galleryOptions: NgxGalleryOptions[] = EDIT_FORM_GALLERY_OPTIONS;
  companies: Company[] = [];
  redirectUrl = this.getRedirectUrl.transform('food-drink');
  subscriptions: Subscription[] = [];
  editCase = false;
  formAction: string;
  coverShown = true;
  dropZoneFiles = [];
  dropzoneConfig = {
    maxFiles: 10
  };
  imgPath;
  realFolder;

  // Address search
  @ViewChild('searchAddress')
  public searchElementRef: ElementRef;
  options = {types: ['geocode']};


  constructor(
    private _fb: FormBuilder,
    private _foodDrink: FoodDrinkService,
    public common: CommonService,
    public router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private checkFormData: CheckFormDataPipe,
    private _companies: CompaniesService,
    public auth: AuthService,
    private getRedirectUrl: RedirectUrlGeneratorPipe,
    private _formMsg: ShowFormMessagePipe,
    private formData: BuildFormDataPipe,
    private subject: SubjectService,
    private elRef: ElementRef,
    private markCover: MarkSelectedCoverImagePipe,
    private matDialog: MatDialog,
    private basename: GetFileBasenamePipe,
  ) {

    this.foodDrinkForm = this._fb.group(this.formFields);
    this.common.dataLoading = true;
    this.subscriptions.push(this.route.data.subscribe((dt: Data) => {
      this.getCompanies();
      this.prepareEditForm(dt);

      this.formAction = this.editCase ? 'update' : 'add';
      this.coverShown = !this.editCase || !!this.imgPath;
      this.common.dataLoading = false;
    }));
  }

  ngOnInit() {

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


  /**
   * Prepares edit form fields & data
   * @param dt router data
   */
  prepareEditForm(dt): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.foodDrinkData = dt['foodDrink'];
      this.foodDrinkData['oldName'] = dt['foodDrink']['name'];
      this.formFields['id'] = '';
      this.foodDrinkForm = this._fb.group(this.formFields);
      this.foodDrinkForm.patchValue(this.foodDrinkData);
      this.editCase = true;
      this.addressCtrl.disable();
      if (this.foodDrinkData['img']) {
        this.imgPath = this.foodDrinkData['realFolder'] + '/' + this.foodDrinkData['img'];
      }
    }
  }

  /**
   * Marks the selected image as cover
   * @param event
   * @param index
   */
  makeCover(event, index) {

    const cover = SetImageAsCover.set(event, index, this.foodDrinkData.images);
    this.coverShown = true;

    if (cover) {
      this.imgPath = cover['big'];
      const p = this.basename.transform(this.imgPath);
      this.foodDrinkForm.patchValue({img: p});
      this.subscriptions.push(this._foodDrink.makeCover({img: p, id: this.foodDrinkData.id}).subscribe(dt => {
        this.toastr.success('The selected image was set as cover successfully');
      }));
    }
  }

  deleteImage(event, index) {

    this.subscriptions.push(this.matDialog.open(ConfirmationDialogComponent, CONFIRM_DIALOG_SETTINGS).afterClosed().subscribe(r => {
      if (r) {
        const currentImg = this.foodDrinkData.images[index].big;
        if (!CheckIfCoverImageWhenRemoving.check(currentImg, this.imgPath)) {
          this.foodDrinkData.images = this.foodDrinkData.images.filter(i => i['big'] !== currentImg);
          this.subscriptions.push(this._foodDrink.removeImage({filename: currentImg}).subscribe(dt => {
            this.toastr.success('The selected image was removed successfully');
          }));
        } else {
          this.toastr.error('Please change the cover first.', 'This is the cover image.');
        }
      }
    }));


  }

  /**
   * Resets address and reloads maps api to allow user to select from drop down again
   */
  resetAddress() {
    this.foodDrinkForm.patchValue({'address': ''});
    this.addressCtrl.enable();
  }

  /**
   * Gets activity provider companies list
   */
  getCompanies() {
    this.subscriptions.push(this._companies.get({name: 'food/drink'}).subscribe((dt: Company[]) => {
      this.companies = dt;
      this.checkFormData.transform('food/drink', this.foodDrinkData, this.companies, this.editCase);
    }));

    if (this.auth.checkRoles('partner')) {
      this.foodDrinkForm.patchValue({company_id: this.auth.userData.company.id})
    }
  }

  /**
   * Adds/updates food drink info
   * @param address food-drink address
   */
  save(address) {

    // if (this.foodDrinkForm.valid) {
    this.common.formProcessing = true;
    const formData = this.formData.transform({
      ...this.foodDrinkForm.value,
      address: address.el.nativeElement.value
    }, this.dropZoneFiles);

    this.subscriptions.push(this._foodDrink[this.formAction](formData).subscribe(() => {
      this._formMsg.transform('food/drink', this.editCase, this.redirectUrl);
    }));

    // }
  }

  /**
   * Gets drop zone file
   * @param e the file
   */
  getFile(e) {
    this.dropZoneFiles.push(e);
  }


  /**
   * Removes saved drop zone image
   */
  removeSavedImg() {
    this.imgPath = '';
    this.foodDrinkForm.patchValue({'img': ''});
    this.dropZoneFiles = null;
  }

  toggleSidebar(action) {
    this.subject.setSidebarAction(action);
  }

  get nameCtrl() {
    return this.foodDrinkForm.get('name');
  }

  get latCtrl() {
    return this.foodDrinkForm.get('lat');
  }

  get lngCtrl() {
    return this.foodDrinkForm.get('lng');
  }

  get addressCtrl() {
    return this.foodDrinkForm.get('address');
  }

  get descCtrl() {
    return this.foodDrinkForm.get('description');
  }

  get companyCtrl() {
    return this.foodDrinkForm.get('company_id');
  }

  ngAfterViewInit() {
    // Marks the cover image on page load
    this.markCover.transform(this.imgPath, this.elRef);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
