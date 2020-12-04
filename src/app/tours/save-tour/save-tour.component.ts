import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ToursService} from '@core/services/tours.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EDIT_FORM_GALLERY_OPTIONS, SPINNER_DIAMETER, TIMEPICKER_THEME, TOURS_FOLDER} from '@core/constants/global';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '@core/services/common.service';
import {patternValidator} from '@core/helpers/pattern-validator';
import {LATITUDE_PATTERN, LONGITUDE_PATTERN} from '@core/constants/patterns';
import {Partner} from '@shared/models/Partner';
import {CheckFormDataPipe} from '@shared/pipes/check-form-data.pipe';
import {Subscription} from 'rxjs';
import {AuthService} from '@core/services/auth.service';
import {Company} from '@shared/models/Company';
import {CompaniesService} from '@core/services/companies.service';
import {TOURS_FIELDS} from '@core/helpers/form-fields-getter';
import {NgxGalleryOptions} from 'ngx-gallery-9';
import {SubjectService} from '@core/services/subject.service';
import {Tour} from '@shared/models/Tour';
import {ShowFormMessagePipe} from '@shared/pipes/show-form-message.pipe';
import {BuildFormDataPipe} from '@shared/pipes/build-form-data.pipe';
import moment from 'moment';
import {MAX_LOCATION_CHOICES} from '@core/constants/map';
import {getFerryLocationsFormGroup} from '@core/constants/ferries_order_form';

@Component({
  selector: 'app-save-tour',
  templateUrl: './save-tour.component.html',
  styleUrls: ['./save-tour.component.scss']
})
export class SaveTourComponent implements OnInit, OnDestroy {


  @ViewChild('searchAddress')
  public searchElementRef: ElementRef;

  partners: Partner[] = [];
  tourTypes = [];
  saveTourForm: FormGroup;
  uploadImages;
  tourFields = TOURS_FIELDS;
  editCase = false;
  spinnerDiameter = SPINNER_DIAMETER;
  redirectUrl = this.auth.checkRoles('admin') ? 'admin/tours' : 'partners/tours';

  tourData: Tour;
  coverPath;
  coverShown = true;

  options = {types: ['geocode']};

  routeDataSubscription: Subscription;
  partnersSubscription: Subscription;

  galleryOptions: NgxGalleryOptions[] = EDIT_FORM_GALLERY_OPTIONS;

  subscriptions: Subscription[] = [];
  companies: Company[];

  dropZoneFiles = [];
  dropzoneConfig = {
    maxFiles: 10
  };

  formAction;
  timepickerTheme = TIMEPICKER_THEME;
  isSubmitted = false;
  peopleCount = 2;
  maxLocationsChoices = 5;

  previousDatesFilter = (d: Date | null): boolean => {
    return moment(d).isSameOrAfter(moment(), 'day');
  }


  constructor(
    private _tours: ToursService,
    private _fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    // private mapsAPILoader: MapsAPILoader,
    private toastr: ToastrService,
    public common: CommonService,
    private checkFormData: CheckFormDataPipe,
    public auth: AuthService,
    private _companies: CompaniesService,
    private subject: SubjectService,
    private _formMsg: ShowFormMessagePipe,
    private formData: BuildFormDataPipe,
    private fb: FormBuilder
  ) {

    this.saveTourForm = this.fb.group({
      name: ['', Validators.required],
      oldName: [''],
      locations: this.fb.array([
        this.fb.group(this.getFields('Start')),
        this.fb.group(this.getFields('End'))
      ]),
      tours_type_id: ['', Validators.required],
      company_id: ['', Validators.required],
      start_date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      end_date: ['', Validators.required],
      participants_max_count: ['', Validators.required],
      price: ['', Validators.required],
      folder: 'tours'
    });


    this.getCompanies();
    this.getToursType();

  }

  ngOnInit() {


    console.log(this.saveTourForm.value)

    this.common.dataLoading = true;
    this.subscriptions.push(this.route.data.subscribe(dt => {
      this.coverShown = !!this.coverPath;
      this.formAction = this.editCase ? 'update' : 'add';
      if (this.route.snapshot.paramMap.get('id')) {
        this.tourData = dt['oneTour'];
        this.tourFields['id'] = '';
        this.saveTourForm = this._fb.group(this.tourFields);
        this.saveTourForm.patchValue(this.tourData);
        this.saveTourForm.controls['address'].disable();
        this.editCase = true;
        if (this.tourData['img']) {
          console.log(this.tourData)
          this.coverPath = this.tourData['realFolder'] + '/' + this.tourData['img'];
        }

      }
      this.common.dataLoading = false;
    }));

    if (!this.editCase) {
      this.saveTourForm = this._fb.group(this.tourFields);
    }
  }

  getFields(title) {
    return {
      name: ['', Validators.required],
      title: [title]
    };
  }

  /**
   * Resets address and reloads maps api to allow user to select from drop down again
   */
  resetAddress() {
    this.saveTourForm.patchValue({'address': ''});
    this.saveTourForm.controls['address'].enable();
    // this.mapsAPILoader.load().then(() => {
    //     const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {types: ['geocode']});
    // });
  }

  /**
   * Gets ferry companies list
   */
  getCompanies() {
    this.subscriptions.push(this._companies.get({name: 'tours'}).subscribe((dt: Company[]) => {
      this.companies = dt;
      this.checkFormData.transform('tours', this.tourData, this.companies, this.editCase);
    }));
  }

  /**
   * Gets tour types list
   */
  getToursType() {
    this._tours.getAllTourTypes().subscribe((types: any) => {
      this.tourTypes = types;
      if (types.length === 0) {
        this.toastr.info('Please add at least one tour type.', 'No tour types', {timeOut: 0});
      }
    });
  }

  addLocation() {
    const locationsLen = this.locationsCtrls.length;
    if (locationsLen < MAX_LOCATION_CHOICES) {
      const name = 'Stop ' + (locationsLen - 1);
      // this.locationsCtrls.controls.push(this.fb.group(getFerryLocationsFormGroup(name, this.locationsCtrls.length - 1)));
      // this.getLocationCtrlByName('End').patchValue({order: this.locationsCtrls.length});
    }
  }

  /**
   * Gets uploaded file list
   * @param files files object
   */
  // getFiles(files) {
  //   this.uploadImages = files.item(0);
  // }

  removeDropzoneImg(e) {
    this.dropZoneFiles = this.dropZoneFiles.filter(f => e.name !== f.name);
  }

  removeLocationInput(i) {
    this.locationsCtrls.removeAt(i);
    // this.updateMapLocations();
    // this.getRoutePrice();
  }


  saveTour() {
    // if (this.foodDrinkForm.valid) {
    console.log(this.dropZoneFiles)
    console.log(this.tourForm.value)
    // this.common.formProcessing = true;
    // const formData = this.formData.transform({
    //   ...this.tourForm.value,
    //   address: (<HTMLInputElement>document.querySelector('#searchAddress')).value
    // }, this.dropZoneFiles);
    //
    // this.subscriptions.push(this._tours[this.formAction](formData).subscribe(() => {
    //   this._formMsg.transform('tours', this.editCase, this.redirectUrl);
    // }));

    // }
  }


  /**
   * Add or edit a tour
   * @param searchAddress search full address
   */
  // saveTour(searchAddress) {
  //
  //   // if (this.saveTourForm.valid) {
  //
  //   // if (!this.dropZoneFile && !this.editCase) {
  //   //     this.toastr.error('Please select an image to upload', 'No files');
  //   // } else {
  //   this.common.formProcessing = true;
  //   const data = this.saveTourForm.value;
  //   const fd = new FormData();
  //   fd.append('lat', data.lat);
  //   fd.append('lng', data.lng);
  //   fd.append('name', data.name);
  //   fd.append('tours_type_id', data.tours_type_id ? data.tours_type_id : '');
  //   fd.append('company_id', data.company_id ? data.company_id : '');
  //   fd.append('address', searchAddress.el.nativeElement.value.replace(/\r?\n|\r/g, ''));
  //   fd.append('upload_image', this.dropZoneFile ? this.dropZoneFile : '');
  //   if (!this.coverPath) {
  //
  //     fd.append('img', this.dropZoneFile ? this.dropZoneFile.name : '');
  //   }
  //   fd.append('folder', data.folder);
  //
  //   if (this.editCase) {
  //     fd.append('id', data['id'])
  //     this._tours.updateTour(fd).subscribe(dt => {
  //       this.common.formProcessing = false;
  //       this.router.navigate([this.redirectUrl]);
  //       this.toastr.success('The tour info has been updated successfully', 'Updated!');
  //     });
  //   } else {
  //     this._tours.insertTours(fd).subscribe((r: any) => {
  //       this.common.formProcessing = false;
  //       this.router.navigate([this.redirectUrl]);
  //       this.toastr.success('The tour info has been added successfully', 'Added!');
  //     });
  //   }
  //   // }
  //
  //
  //   // }
  //
  //
  // }


  getFile(e) {
    this.dropZoneFiles.push(e);
  }

  removeSavedImg() {
    this.coverPath = '';
  }

  toggleSidebar(action) {
    this.subject.setSidebarAction(action);
  }

  dateChanged(e) {
  }

  peopleCountChanged(e) {
    console.log(e)
    this.saveTourForm.patchValue({participants_max_count: e});
  }

  locationChanged(val, i) {

    // Patching drop down value
    this.locationsCtrls.controls[i].patchValue({name: val});

  }

  getLocationId(i) {
    const id = 'start-point';
    const locationsLen = this.locationsCtrls.length;
    if (i === 0) {
      return id;
    } else if (i === 1) {
      return 'end-point';
    } else if (locationsLen === 3) {
      return 'stop-1';
    } else if (locationsLen === 4) {
      return i === 2 ? 'stop-1' : 'stop-2';
    }
  }

  getPlaceholderText(i) {
    const text = 'Departure port';
    const locationsLen = this.locationsCtrls.length;
    if (i === 0) {
      return text;
    } else if (i === 1) {
      return 'Arrival port';
    } else if (locationsLen === 3) {
      return 'Stop 1';
    } else if (locationsLen === 4) {
      return i === 2 ? 'Stop 1' : 'Stop 2';
    }
  }

  getLabelText(i) {
    if (i === 0) {
      return 'From';
    } else if (i === 1) {
      return 'To';
    }
  }


  get tourForm() {
    return this.saveTourForm;
  }

  get nameCtrl() {
    return this.tourForm.get('name');
  }

  get locationsCtrls(): FormArray {
    return this.saveTourForm.get('locations') as FormArray;
  }


  get latCtrl() {
    return this.tourForm.get('lat');
  }

  get lngCtrl() {
    return this.tourForm.get('lng');
  }

  get addressCtrl() {
    return this.tourForm.get('address');
  }

  ngOnDestroy() {
    if (this.routeDataSubscription) {
      this.routeDataSubscription.unsubscribe();
    }
    if (this.partnersSubscription) {
      this.partnersSubscription.unsubscribe();
    }
  }

}
