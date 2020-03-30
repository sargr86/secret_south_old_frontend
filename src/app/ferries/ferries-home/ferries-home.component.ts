import {Component, OnInit} from '@angular/core';
import {MainService} from '../../home/services/main.service';
import {ToastrService} from 'ngx-toastr';
import * as mapStylesData from '../../maps/map_styles2.json';
import {API_URL, TIMEPICKER_THEME} from '@core/constants/settings';
import {FerryService} from '@core/services/ferry.service';
import {Ferry} from '@shared/models/Ferry';
import {NgxGalleryOptions} from 'ngx-gallery';
import {AuthService} from '@core/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as jwtDecode from 'jwt-decode';
import {CommonService} from '@core/services/common.service';
import {SubjectService} from '@core/services/subject.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Socket} from 'ngx-socket-io';

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
  timepickerTheme = TIMEPICKER_THEME;
  personsCount = 2;
  oneWayTrip = true;
  authUser;
  selectedStartPoint;
  selectedEndPoint;

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
  ) {
    this.authUser = jwtDecode(localStorage.getItem('token'));
  }

  ngOnInit(): void {
    this.getFerryLocations();
    this.getFerryDirections();
    this.getFerryMapDirections();
    this.initOrderForm();
    this.saveSocialAuthToken();
    this.handleSocketEvents();
    this.mapStyles = mapStylesData['default'];
    this.selectAction = this.selectedFerry ? 'Cancel' : 'Select';
    this.common.dataLoading = false;

    console.log(this.authUser)
  }

  handleSocketEvents() {
    this.socket.on('orderCreated', (data) => {
      const customer = data.order.client;
      if (customer) {
        this.toastr.success(`The order has been created successfully!`,
          'Order created!', {enableHtml: true});
      }
    });

    this.socket.on('orderTakenFinished', (data) => {
      console.log('order taken finished')
      console.log(data)

      this.toastr.success(`Your order has been taken by <strong>${data.driver.full_name}</strong>`,
        '', {enableHtml: true});
    });
    this.socket.on('arrivedToOrderFinished', (data) => {
      this.toastr.success(`The boat is arrived. Please get on the board and have a nice trip! Thank you!`,
        '', {enableHtml: true});
    });

    this.socket.on('orderFinished', (data) => {
      this.toastr.success(`The boat reached to the final destination. Thank you for choosing our company`,
        '', {enableHtml: true});
    });
  }

  initOrderForm() {
    this.orderFerryForm = this.fb.group({
      startPoint: [''],
      endPoint: [''],
      time: [''],
      wayType: [1],
      more: this.createMoreFormGroup(),
      payment: [1],
      status: ['pending']
    });
  }

  // Saving social auth access token to local storage
  saveSocialAuthToken() {
    const token = this.route.snapshot.queryParams.token;
    if (token) {
      localStorage.setItem('token', token);
    }
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

  }

  markerClick(infowindow) {
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infowindow;
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

  getDirectionIcon() {
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

  selectDirection(direction) {
    console.log(direction)
    this.lines.push({lat: +direction.lat, lng: +direction.lng});
  }

  removeDirection(direction) {
    this.lines = this.lines.filter(l => {
      const dirLat = +direction.lat;
      const dirLng = +direction.lng;
      return l.lng !== dirLng && l.lat !== dirLat;
    });
  }

  sourceChanged(e) {
    this.orderFerryForm.patchValue({startPoint: e.value});
    this.selectedStartPoint = e.value;
  }

  destinationChanged(e) {
    this.orderFerryForm.patchValue({endPoint: e.value});
    this.selectedEndPoint = e.value;
  }

  personsCountChanged(count) {
    this.orderFerryForm.get('more').patchValue({children: count});
  }

  timeChanged(time) {
    this.orderFerryForm.patchValue({time});
  }

  bikeChanged(e) {
    this.oneWayTrip = e.checked;
    this.orderFerryForm.get('more').patchValue({bike: this.oneWayTrip});
  }


  wayTypeChanged(e) {
    this.oneWayTrip = e.target.checked;
  }

  orderFerry() {
    const formValue = this.orderFerryForm.value;
    formValue.client = {
      first_name: this.authUser.first_name,
      last_name: this.authUser.last_name,
      phone: this.authUser.phone,
      email: this.authUser.phone
    };

    console.log(formValue)

    this.socket.emit('createOrder', JSON.stringify(formValue));
  }
}
