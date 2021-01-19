import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {
  CONFIRM_DIALOG_SETTINGS,
  DEFAULT_TOUR_MAX_PARTICIPANTS_COUNT,
  EDIT_FORM_GALLERY_OPTIONS, LOCATION_CONTROLS, MAX_LOCATION_CHOICES, PREVIOUS_DATES_FILTER,
  SPINNER_DIAMETER,
  TIMEPICKER_THEME,
  TOURS_DROPZONE_CONFIG
} from '@core/constants/global';
import {NgxGalleryOptions} from 'ngx-gallery-9';
import {Subscription} from 'rxjs';
import {CommonService} from '@core/services/common.service';
import {GetTourFormFieldsPipe} from '@shared/pipes/get-tour-form-fields.pipe';
import {Company} from '@shared/models/Company';
import {LocationsService} from '@core/services/locations.service';
import {CheckFormDataPipe} from '@shared/pipes/check-form-data.pipe';
import {CompaniesService} from '@core/services/companies.service';
import {ToursService} from '@core/services/tours.service';
import {ToastrService} from 'ngx-toastr';
import {Tour} from '@shared/models/Tour';
import {FilterEndCheckoutDatesPipe} from '@shared/pipes/filter-end-checkout-dates.pipe';
import moment from 'moment';
import {ActivatedRoute, Router} from '@angular/router';
import {SubjectService} from '@core/services/subject.service';
import SelectImageToMakeCoverOnPageLoad from '@core/helpers/select-image-to-make-cover-on-page-load';
import {ConfirmationDialogComponent} from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import CheckIfCoverImageWhenRemoving from '@core/helpers/check-if-cover-image-when-removing';
import {MatDialog} from '@angular/material/dialog';
import SetImageAsCover from '@core/helpers/set-image-as-cover';

@Component({
  selector: 'app-save-tour-form',
  templateUrl: './save-tour-form.component.html',
  styleUrls: ['./save-tour-form.component.scss']
})
export class SaveTourFormComponent implements OnInit, OnDestroy {
  tourFields: Tour = this.getTourFormFields.transform();
  toursForm: FormGroup = this.fb.group(this.tourFields);

  editCase = false;
  isSubmitted = false;
  backUrl = 'admin/tours';

  dropZoneFiles = [];
  dropZoneConfig = TOURS_DROPZONE_CONFIG;

  timePickerTheme = TIMEPICKER_THEME;
  spinnerDiameter = SPINNER_DIAMETER;
  galleryOptions: NgxGalleryOptions[] = EDIT_FORM_GALLERY_OPTIONS;
  subscriptions: Subscription[] = [];
  maxLocationChoices = MAX_LOCATION_CHOICES;
  maxParticipantsCount = DEFAULT_TOUR_MAX_PARTICIPANTS_COUNT;


  companies;
  tourData: Tour;
  tourTypes;
  locationsList;

  coverPath;
  coverShown = false;

  previousDatesFilter = PREVIOUS_DATES_FILTER;
  checkoutDatesFilter = (d: Date | null): boolean => moment(d).isSameOrAfter(moment(this.startDateCtrl.value), 'day');


  constructor(
    private fb: FormBuilder,
    public common: CommonService,
    private toursService: ToursService,
    private locationsService: LocationsService,
    private companiesService: CompaniesService,
    private subject: SubjectService,
    private toastr: ToastrService,
    private checkFormData: CheckFormDataPipe,
    private getCheckoutDates: FilterEndCheckoutDatesPipe,
    private getTourFormFields: GetTourFormFieldsPipe,
    public router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.common.dataLoading = false;
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
          this.removeSliderImage(event, index);
        }, titleText: 'delete'
      }
    ];
  }

  ngOnInit(): void {

    this.getLocations();
    this.getTourTypes();
    this.getCompanies();

  }

  getLocations() {
    this.subscriptions.push(this.locationsService.get().subscribe(dt => {
      this.locationsList = dt;
      this.handleEditCase();
    }));
  }

  getCompanies(): void {
    this.subscriptions.push(this.companiesService.get({name: 'tours'}).subscribe((dt: Company[]) => {
      this.companies = dt;
      this.checkFormData.transform('tours', this.tourData, this.companies, this.editCase);
    }));
  }

  getTourTypes(): void {
    this.subscriptions.push(this.toursService.getAllTourTypes().subscribe((types: any) => {
      this.tourTypes = types;
      if (types.length === 0) {
        this.toastr.info('Please add at least one tour type.', 'No tour types', {timeOut: 0});
      }
    }));
  }

  handleEditCase() {
    this.subscriptions.push(this.route.data.subscribe(dt => {
      if (this.route.snapshot.paramMap.get('id') && dt) {
        this.editCase = true;

        this.tourData = dt.tour;
        this.tourFields.id = null;
        this.toursForm = this.fb.group(this.tourFields);

        this.toursForm.patchValue({...this.tourData, oldName: this.tourData.name});
        this.toursForm.patchValue(this.tourData?.tours_dailies?.[0] as any);
        this.tourData.tour_locations.map((l, index) => {
          const c = this.toursForm.controls.locations as any;
          if (this.tourData.tour_locations.length > c.length) {
            this.addLocationControl();
          }
          c.controls[index].patchValue({id: l.id, name: l.id, order: index});
        });

        this.generateTourName();

        this.coverPath = this.tourData.img ? this.tourData.realFolder + '/' + this.tourData.img : null;
        this.coverShown = !!this.coverPath;

        this.common.dataLoading = false;
      }
    }));
  }

  dateChanged(e, which): void {
    if (which === 'start' && this.locations.length === 1) {
      this.endDateCtrl.patchValue(e.value);
    }
  }

  getLocationControlDetails(index, property) {
    this.locations.controls[index].patchValue({title: LOCATION_CONTROLS[index].title});
    return LOCATION_CONTROLS[index][property];
  }

  addLocationControl(): void {
    const locationsLen = this.locations.length;
    if (locationsLen < MAX_LOCATION_CHOICES) {
      const name = LOCATION_CONTROLS[locationsLen].title;
      this.locations.controls.push((this.getTourFormFields.getLocationsFormGroup(name, locationsLen - 1)));
    }
  }

  removeLocationControl(i): void {
    this.locations.removeAt(i);
  }

  locationChanged(value, i) {
    this.locations.controls[i].patchValue({id: value});
    this.generateTourName();
  }

  getLocationCtrlByName(name: string) {
    return this.locations.controls.find(c => c.value.title === name);
  }

  peopleCountChanged(e: number) {
    this.toursForm.patchValue({max_participants_count: e});
  }

  generateTourName() {
    let name = '';

    this.locations.controls.map((c, index) => {
      name += this.locationsList.find(l => l.id === +c.value.id)?.name + (index === this.locations.controls.length - 1 ? '' : '-');
    });
    this.toursForm.patchValue({name});
  }

  saveTourDetails() {
    this.isSubmitted = true;

    const formValues = this.toursForm.getRawValue();
    const formData = this.buildFormData(formValues);
    const formAction = this.editCase ? 'update' : 'add';

    this.toursService[formAction](formData).subscribe(() => {
      this.router.navigate(['admin/tours/show']);
    });


  }

  buildFormData(formValues) {
    const formData = new FormData();
    for (const field of Object.keys(formValues)) {
      formData.append(field, field === 'locations' ? JSON.stringify(formValues[field]) : formValues[field]);
    }


    formData.forEach((value, key) => {
      // console.log(key + ' ' + value)
    });

    this.dropZoneFiles.map(file => {
      formData.append('upload_images', file, file ? file.name : '');
    });

    return formData;
  }

  getFile(e) {
    this.dropZoneFiles.push(e);
  }

  removeDropzoneImg(e) {
    this.dropZoneFiles = this.dropZoneFiles.filter(f => e.name !== f.name);
  }

  removeSliderImage(event, index) {

    this.dialog.open(ConfirmationDialogComponent, CONFIRM_DIALOG_SETTINGS).afterClosed().subscribe(r => {
      if (r) {
        const currentImg = this.tourData.images[index].big;
        if (!CheckIfCoverImageWhenRemoving.check(currentImg, this.coverPath)) {
          this.tourData.images = this.tourData.images.filter(i => i.big !== currentImg);
          this.toursService.removeImage({filename: currentImg}).subscribe(dt => {
            this.toastr.success('The selected image was removed successfully');
          });
        } else {
          this.toastr.error('Please change the cover first.', 'This is the cover image.');
        }
      }
    });


  }

  makeCover(event, index) {

    const cover = SetImageAsCover.set(event, index, this.tourData.images);
    this.coverShown = true;
    if (cover) {
      this.coverPath = cover.big;
      const imgFileName = this.coverPath.split('/').pop();
      this.toursService.makeCover({img: imgFileName, id: this.tourData.id}).subscribe(dt => {
        this.toursForm.patchValue({img: imgFileName})
        this.toastr.success('The selected image was set as cover successfully');
      });
    }
  }

  toggleSidebar(action) {
    this.subject.setSidebarAction(action);
  }

  get locations(): FormArray {
    return this.toursForm.get('locations') as FormArray;
  }

  get toursTypes() {
    return this.toursForm.get('tours_type_id');
  }

  get nameCtrl(): AbstractControl {
    return this.toursForm.get('name');
  }

  get startDateCtrl(): AbstractControl {
    return this.toursForm.get('start_date');
  }

  get endDateCtrl(): AbstractControl {
    return this.toursForm.get('end_date');
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


}
