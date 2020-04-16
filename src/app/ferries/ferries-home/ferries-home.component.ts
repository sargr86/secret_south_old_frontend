import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MainService} from '@core/services/main.service';
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
      if (this.authUser.position.name === 'Customer') {
        await this.router.navigate(['customers/orders/show']);
      }
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
    this.chatForm = this.fb.group({message: ['', Validators.required]});
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
    this.lines.push({lat: +direction.latitude, lng: +direction.longitude});
  }

  removeDirection(direction) {
    this.lines = this.lines.filter(l => {
      const dirLat = +direction.latitude;
      const dirLng = +direction.longitude;
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
    // formValue.operatorId = localStorage.getItem('operatorId');
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

}
