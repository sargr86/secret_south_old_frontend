import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MainService} from '@core/services/main.service';
import {ToastrService} from 'ngx-toastr';
import * as mapStylesData from '../../maps/map_styles2.json';
import {API_URL, MAX_LOCATION_CHOICES, TIMEPICKER_THEME} from '@core/constants/settings';
import {FerryService} from '@core/services/ferry.service';
import {Ferry} from '@shared/models/Ferry';
import {NgxGalleryOptions} from 'ngx-gallery';
import {AuthService} from '@core/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as jwtDecode from 'jwt-decode';
import {CommonService} from '@core/services/common.service';
import {SubjectService} from '@core/services/subject.service';
import {Form, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Socket} from 'ngx-socket-io';
import {OrdersService} from '@core/services/orders.service';
import moment from 'moment';
import {WebSocketService} from '@core/services/websocket.service';

@Component({
  selector: 'app-ferries-home',
  templateUrl: './ferries-home.component.html',
  styleUrls: ['./ferries-home.component.scss']
})
export class FerriesHomeComponent implements OnInit {

  lat = 51.797999;
  lng = -8.294371;
  latlng = [];
  ferryPositions: any = {lat: 0, lng: 0};
  ferryDirections;
  ferryMapDirections;
  selectedFerryDirections = {startPoint: null, endPoint: null};
  lines = [];
  mapStyles;
  host = API_URL;
  selectedFerry = null;
  selectAction;
  showFilters = true;
  ferryData: Ferry;
  previous;
  orderTableCols = ['value', 'title'];
  orderData;
  orderFerryForm: FormGroup;
  chatForm: FormGroup;
  timepickerTheme = TIMEPICKER_THEME;
  personsCount = 2;
  oneWayTrip = true;
  authUser;
  selectedStartPoint;
  selectedEndPoint;
  roomName;
  maxLocationsChoices = MAX_LOCATION_CHOICES;
  selectedLocations = [];
  @ViewChild('messagesList') private messagesList: ElementRef;

  galleryOptions: NgxGalleryOptions[] = [
    {
      'previewFullscreen': true,
      'height': '200px',
      'previewKeyboardNavigation': true,
      'imageDescription': true,
      'previewCloseOnEsc': true
    },
    {'breakpoint': 500, 'width': '300px', 'height': '300px', 'thumbnailsColumns': 3},
    {'breakpoint': 300, 'width': '100%', 'height': '200px', 'thumbnailsColumns': 2},

  ];

  constructor(
    private main: MainService,
    private toastr: ToastrService,
    private _ferries: FerryService,
    public auth: AuthService,
    public router: Router,
    private route: ActivatedRoute,
    private common: CommonService,
    private subject: SubjectService,
    private fb: FormBuilder,
    public socket: Socket,
    private ordersService: OrdersService,
    private webSocketService: WebSocketService
  ) {

    this.getUserTodaysOrders();
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.authUser = jwtDecode(token);
    }
    this.getFerryLocations();
    this.getFerryDirections();
    this.getFerryMapDirections();
    this.initOrderForm();
    this.saveSocialAuthToken();
    this.handleSocketEvents();
    this.mapStyles = mapStylesData['default'];
    this.selectAction = this.selectedFerry ? 'Cancel' : 'Select';
    this.common.dataLoading = false;

  }

  handleSocketEvents() {

    this.webSocketService.on('orderCreated').subscribe(async (data) => {
      console.log(data)
      if (this.authUser.position.name === 'Customer') {
        await this.router.navigate(['customers/orders/show']);
      }
    });


  }

  initOrderForm() {
    this.orderFerryForm = this.fb.group({
      locations: this.fb.array([
        this.createLocationsFormGroup(),
        this.createLocationsFormGroup()
      ]),
      time: [''],
      wayType: [1],
      more: this.createMoreFormGroup(),
      payment: [1],
      status: ['pending']
    });

    this.chatForm = this.fb.group({message: ['', Validators.required]});
  }

  // Saving social auth access token to local storage
  saveSocialAuthToken() {
    const token = this.route.snapshot.queryParams.token;
    if (token) {
      localStorage.setItem('token', token);
    }
  }

  createLocationsFormGroup(): FormGroup {
    return this.fb.group({
        name: ['', Validators.required],
        latitude: ['', Validators.required],
        longitude: ['', Validators.required],
      }
    );
  }

  createMoreFormGroup(): FormGroup {
    return this.fb.group({
        children: ['', [Validators.required]],
        bike: ['', [Validators.pattern('^[0-9].*$')]],
      }
    );
  }


  getFerryLocations() {

    this.main.getFerryLocation().subscribe((r: any) => {
      if (r.status === 0) {
        this.toastr.error(r.message);
      }

      const arr = [];
      if (r) {
        r.map((latlngs) => {
          this.ferryPositions.lat = parseFloat(latlngs.lat);
          this.ferryPositions.lng = parseFloat(latlngs.lng);
          arr.push(latlngs);
        });

        this.ferryPositions = arr;
      }
    });
  }

  getFerryDirections() {
    this.main.getDirections({dropdown: true}).subscribe(dt => {
      this.ferryDirections = dt;
    });
  }

  getFerryMapDirections() {
    this.main.getDirections().subscribe(dt => {
      this.ferryMapDirections = dt;
    });
  }

  mapClick(e) {
    console.log('map clicked')
    console.log(e)
  }

  markerClick(infoWindow) {
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infoWindow;
    this.selectedFerry = null;
    this.selectAction = 'Select';
  }

  closeInfoWindow() {
    this.selectedFerry = null;
    this.selectAction = 'Select';
  }

  // toggleInfoWindow(ferry) {
  //     this.selectedFerry = this.selectAction === 'Select' ? ferry : null;
  //     this.selectAction = this.selectedFerry ? 'Cancel' : 'Select';
  //     this._ferries.getOneFerry({id: ferry.id}).subscribe(d => {
  //         this.ferryData = d;
  //     });
  // }

  getIcon() {
    return 'assets/icons/ferry.svg';
  }

  getLocationIcon() {
    return 'assets/icons/green_circle_small.png';
  }

  selectFerry(ferry) {

    this.selectedFerry = this.selectAction === 'Select' ? ferry : null;
    this.selectAction = this.selectedFerry ? 'Cancel' : 'Select';
    this._ferries.getOneFerry({id: ferry.id}).subscribe(d => {
      this.ferryData = d;
    });
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  getPlaceholderText(i) {
    const text = 'Start Point';
    const locationsLen = this.locations.length;
    if (i === 0) {
      return text;
    } else if (i === locationsLen - 1) {
      return 'End Point';
    }
    if (locationsLen === 3) {
      return i === 1 ? 'Stop 1' : 'End point';
    } else if (locationsLen === 4) {
      return i === 1 ? 'Stop 1' : 'Stop 2';
    }
  }


  sourceChanged(e, i) {
    this.locations.controls[i].patchValue(e.value);
    const location = this.ferryMapDirections.find(d => d.name === e.value);
    this.selectLocation(location, true);
  }

  selectLocation(location, dropdown = false) {
    this.selectedLocations.push(location);
    const selectedLocationsLen = this.selectedLocations.length;

    if (selectedLocationsLen > 2 && selectedLocationsLen <= MAX_LOCATION_CHOICES &&
      selectedLocationsLen !== this.locations.controls.length) {
      this.addLocation();
    }

    if (!dropdown && selectedLocationsLen <= MAX_LOCATION_CHOICES) {

      const firstEmptyControl = this.locations.controls.find(c => c.value.name === '');
      firstEmptyControl.patchValue(location);

    }
    if (selectedLocationsLen <= MAX_LOCATION_CHOICES) {

      this.lines.push({lat: +location.latitude, lng: +location.longitude});
    }
  }


  addLocation() {
    const companyNameChoiceCountsLen = this.locations.length;
    if (companyNameChoiceCountsLen < MAX_LOCATION_CHOICES) {
      this.locations.controls.push(this.createLocationsFormGroup());
    }
  }

  removeLocation(direction) {
    if (this.selectedLocations.length > 2) {
      let i = 0;
      this.selectedLocations.map(l => {
        if (l.name === direction.name) {
          this.selectedLocations.splice(i, 1);
          this.removeLocationInput(i);
        }
        ++i;
      });

      this.lines = this.lines.filter(l => {
        const dirLat = +direction.latitude;
        const dirLng = +direction.longitude;
        return l.lng !== dirLng && l.lat !== dirLat;
      });
    }
  }

  removeLocationInput(i) {
    this.locations.removeAt(i);
  }


  personsCountChanged(count) {
    this.orderFerryForm.get('more').patchValue({children: count});
  }

  timeChanged(time) {
    this.orderFerryForm.patchValue({time});
  }

  bikeChanged(e) {
    this.orderFerryForm.get('more').patchValue({bike: e.checked});
  }


  wayTypeChanged(e) {
    this.oneWayTrip = e.target.checked;
  }

  orderFerry() {
    const formValue = this.orderFerryForm.getRawValue();
    console.log(formValue)
    // // formValue.operatorId = localStorage.getItem('operatorId');
    formValue.client = {
      first_name: this.authUser.first_name,
      last_name: this.authUser.last_name,
      socket_nickname: this.authUser.socket_nickname,
      phone: this.authUser.phone,
      email: this.authUser.email,
      id: this.authUser.id
    };

    this.webSocketService.emit('createOrder', JSON.stringify(formValue));
  }

  getUserTodaysOrders() {
    if (this.authUser) {

      const sendData = {email: this.authUser.email, dateVal: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]')}
      this.ordersService.getUserActiveOrders(sendData).subscribe(dt => {

      });
    }
  }

  get locations(): FormArray {
    return this.orderFerryForm.get('locations') as FormArray;
  }

}
