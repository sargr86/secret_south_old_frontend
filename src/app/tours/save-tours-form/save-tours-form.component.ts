import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '@core/services/common.service';
import {LocationsService} from '@core/services/locations.service';
import {MAX_LOCATION_CHOICES} from '@core/constants/map';
import {ToastrService} from 'ngx-toastr';
import {ToursService} from '@core/services/tours.service';
import {Subscription} from 'rxjs';
import {Company} from '@shared/models/Company';
import {EDIT_FORM_GALLERY_OPTIONS, SPINNER_DIAMETER, TIMEPICKER_THEME} from '@core/constants/global';
import moment from 'moment';
import {AuthService} from '@core/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Tour} from '@shared/models/Tour';
import {NgxGalleryOptions} from 'ngx-gallery-9';
import {SubjectService} from '@core/services/subject.service';
import {CompaniesService} from '@core/services/companies.service';
import {CheckFormDataPipe} from '@shared/pipes/check-form-data.pipe';

@Component({
  selector: 'app-save-tours-form',
  templateUrl: './save-tours-form.component.html',
  styleUrls: ['./save-tours-form.component.scss']
})
export class SaveToursFormComponent implements OnInit {
  toursForm: FormGroup;
  locationsList;
  tourTypes = [];
  editCase = false;
  isSubmitted = false;


  subscriptions: Subscription[] = [];
  companies: Company[];

  dropZoneFiles = [];
  dropzoneConfig = {
    maxFiles: 10
  };

  formAction;
  timepickerTheme = TIMEPICKER_THEME;
  peopleCount = 2;
  maxLocationsChoices = 5;
  spinnerDiameter = SPINNER_DIAMETER;
  redirectUrl = this.auth.checkRoles('admin') ? 'admin/tours' : 'partners/tours';

  coverPath;
  coverShown = true;

  tourData: Tour;
  tourFields;
  galleryOptions: NgxGalleryOptions[] = EDIT_FORM_GALLERY_OPTIONS;

  maxParticipantsCount = 10;

  previousDatesFilter = (d: Date | null): boolean => {
    return moment(d).isSameOrAfter(moment(), 'day');
  }

  constructor(
    private fb: FormBuilder,
    public common: CommonService,
    private locationsService: LocationsService,
    private toursService: ToursService,
    private companiesService: CompaniesService,
    private checkFormData: CheckFormDataPipe,
    private toastr: ToastrService,
    public auth: AuthService,
    private subject: SubjectService,
    public router: Router,
    private route: ActivatedRoute
  ) {

    this.common.dataLoading = false;

    this.tourFields = {
      name: ['', Validators.required],
      oldName: [''],
      locations: this.fb.array([
        this.getLocationsFormGroup('Start', 0),
        this.getLocationsFormGroup('End', 1)
      ]),
      tours_type_id: ['', Validators.required],
      company_id: ['', Validators.required],
      start_date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      end_date: ['', Validators.required],
      participants_max_count: [this.maxParticipantsCount, Validators.required],
      price: ['', Validators.required],
      folder: 'tours'
    };

  }

  ngOnInit(): void {

    this.getLocations();
    this.getTourTypes();
    this.getCompanies();

    this.common.dataLoading = true;
    this.subscriptions.push(this.route.data.subscribe(dt => {
      this.coverShown = !!this.coverPath;
      this.formAction = this.editCase ? 'update' : 'add';
      if (this.route.snapshot.paramMap.get('id')) {
        this.tourData = dt['oneTour'];
        this.tourFields['id'] = '';
        this.toursForm = this.fb.group(this.tourFields);
        this.toursForm.patchValue(this.tourData);
        this.toursForm.controls['address'].disable();
        this.editCase = true;
        if (this.tourData['img']) {
          console.log(this.tourData)
          this.coverPath = this.tourData['realFolder'] + '/' + this.tourData['img'];
        }

      }
      this.common.dataLoading = false;
    }));

    if (!this.editCase) {
      this.toursForm = this.fb.group(this.tourFields);
    }
  }

  getLocations() {
    this.locationsService.get().subscribe(dt => {
      this.locationsList = dt;
    });
  }

  getCompanies() {
    this.subscriptions.push(this.companiesService.get({name: 'tours'}).subscribe((dt: Company[]) => {
      this.companies = dt;
      this.checkFormData.transform('tours', this.tourData, this.companies, this.editCase);
    }));
  }

  getLocationId(i) {
    const id = 'start-point';
    const locationsLen = this.locations.length;
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

  locationChanged(value, i) {
    this.locations.controls[i].patchValue({name: value});
  }

  getTourTypes() {
    this.toursService.getAllTourTypes().subscribe((types: any) => {
      this.tourTypes = types;
      if (types.length === 0) {
        this.toastr.info('Please add at least one tour type.', 'No tour types', {timeOut: 0});
      }
    });
  }

  getPlaceholderText(i) {
    const text = 'Departure point';
    const locationsLen = this.locations.length;
    if (i === 0) {
      return text;
    } else if (i === 1) {
      return 'Arrival point';
    } else if (locationsLen === 3) {
      return 'Stop 1';
    } else if (locationsLen === 4) {
      return i === 2 ? 'Stop 1' : 'Stop 2';
    }
  }

  removeDropzoneImg(e) {
    this.dropZoneFiles = this.dropZoneFiles.filter(f => e.name !== f.name);
  }

  addLocation() {
    const locationsLen = this.locations.length;
    if (locationsLen < MAX_LOCATION_CHOICES) {
      const name = 'Stop ' + (locationsLen - 1);
      this.locations.controls.push((this.getLocationsFormGroup(name, this.locations.length - 1)));
      this.getLocationCtrlByName('End').patchValue({order: this.locations.length});
    }
  }

  removeLocationInput(i) {
    this.locations.removeAt(i);
  }

  getLocationCtrlByName(name) {
    return this.locations.controls.find(c => c.value.title === name);
  }

  getLocationsFormGroup(title, order) {
    return this.fb.group({
      name: ['', Validators.required],
      title: [title],
      order: [order]
    });
  }

  dateChanged(e) {
  }

  peopleCountChanged(e) {
    this.toursForm.patchValue({participants_max_count: e});
  }

  saveTourDetails() {
    console.log(this.toursForm.getRawValue())
  }

  getFile(e) {

  }

  toggleSidebar(action) {
    this.subject.setSidebarAction(action);
  }

  get locations(): FormArray {
    return this.toursForm.get('locations') as FormArray;
  }

  get nameCtrl() {
    return this.toursForm.get('name');
  }

}
