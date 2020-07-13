import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MainService} from '@core/services/main.service';
import {ToastrService} from 'ngx-toastr';
import * as mapStylesData from '../../maps/map_styles2.json';
import {
  API_URL,
  MAX_LOCATION_CHOICES,
  STRIPE_CARD_OPTIONS,
  TIMEPICKER_THEME
} from '@core/constants/global';
import {FerriesService} from '@core/services/ferries.service';
import {Ferry} from '@shared/models/Ferry';
import {NgxGalleryOptions} from 'ngx-gallery-9';
import {AuthService} from '@core/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as jwtDecode from 'jwt-decode';
import {CommonService} from '@core/services/common.service';
import {SubjectService} from '@core/services/subject.service';
import {Form, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrdersService} from '@core/services/orders.service';
import moment from 'moment';
import {WebSocketService} from '@core/services/websocket.service';
import {HttpParams} from '@angular/common/http';
import {AgmMap} from '@agm/core';
import {StripeCardComponent, StripeService} from 'ngx-stripe';
import {UsersService} from '@core/services/users.service';
import {MAP_CENTER_COORDINATES} from '@core/constants/map';

declare const google: any;

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
  ferryMapDirections = [];
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
  adultsCount = 2;
  childrenCount = 2;
  oneWayTrip = true;
  authUser;
  selectedStartPoint;
  selectedEndPoint;
  roomName;
  maxLocationsChoices = MAX_LOCATION_CHOICES;
  selectedLocations = [];
  routePrice;
  locationSelected = false;
  markerIconUrl = 'assets/icons/green_circle_small.png';
  mapCenterCoordinates = MAP_CENTER_COORDINATES;

  // Stripe
  cardOptions = STRIPE_CARD_OPTIONS;
  elementsOptions = {locale: 'en'};
  @ViewChild('messagesList') private messagesList: ElementRef;
  @ViewChild(StripeCardComponent) card: StripeCardComponent;


  @ViewChild(AgmMap) map: any;
  mapReady = false;


  lineSymbol = {
    path: 'M 0,-1 0,1', strokeWeight: 1.5, scale: 2
  }

  fwd = google.maps.SymbolPath.FORWARD_OPEN_ARROW;

  polygonOptions = {
    strokeOpacity: 0,
    icons: [{
      icon: this.lineSymbol,
      offset: '0',
      repeat: '20px'
    }, {
      icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW},
      offset: '100%'
    }],
  }

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
    private _ferries: FerriesService,
    public auth: AuthService,
    public router: Router,
    private route: ActivatedRoute,
    private common: CommonService,
    private subject: SubjectService,
    private fb: FormBuilder,
    private ordersService: OrdersService,
    private webSocketService: WebSocketService,
    private stripeService: StripeService,
    private usersService: UsersService
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

  onMapReady(map) {
    this.map = map;
    this.mapReady = true;

    // this.initDrawingManager(map);
  }

  initDrawingManager(map: any) {
    console.log(google.maps)
    const options = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ['polygon']
      },
      polygonOptions: {
        draggable: true,
        editable: true
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON
    };


    const drawingManager = new google.maps.drawing.DrawingManager(options as any);
    drawingManager.setMap(map);
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
        adults: ['', Validators.required],
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
    this.main.getDirections().subscribe((dt: any) => {
      dt.map(d => {
        d.latitude = +d.latitude;
        d.longitude = +d.longitude;
        d.markerIconUrl = this.markerIconUrl;
        this.ferryMapDirections.push(d);
      });
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


  locationChanged(e, i) {

    // Patching drop down value
    this.locations.controls[i].patchValue(e.value);

    this.updateMapLocations();

    const validRoute = !this.locations.controls.find(c => !c.value.name);
    if (validRoute) {
      this.locationSelected = true;
      this.getRoutePrice();
    }
  }

  updateMapLocations() {
    // Saving selected locations
    this.selectedLocations = [];
    this.locations.controls.map(c => {
      if (c.value.name) {
        const location = this.ferryMapDirections.find(fd => fd.name === c.value.name);
        this.selectedLocations.push(location);
      }
    });

    // Marking selected location on the map
    this.ferryMapDirections.map(sl => {

      // Retrieve current location object
      const location = this.selectedLocations.find(d => d.name === sl.name);
      sl.markerIconUrl = 'assets/icons/' + (location ? 'red' : 'green') + '_circle_small.png';
    });
  }

  getRoutePrice() {
    const selectedLocations = this.orderFerryForm.getRawValue()['locations'];

    this._ferries.getRoutePrice(selectedLocations).subscribe((dt: any) => {
      this.updatePriceOnCountsChange(dt);
      this.common.showPrice = true;
      this.lines = [];
      if (dt) {
        if (dt.geometry_type === 'LineString') {
          dt.coordinates.map(c => {
            this.lines.push({name: dt.name, lat: +c.lat, lng: +c.lng});
          });
        } else if (dt.geometry_type === 'Polygon') {
          Object.values(dt.coordinates[0]).reverse().map((c: any) => {
            if (c.lat) {
              this.lines.push({name: dt.name, lat: +c.lat, lng: +c.lng});
            }

          });
        }

      }
    });
  }

  adultsCountChanged(count) {
    this.adultsCount = count;
    this.orderFerryForm.get('more').patchValue({adults: count});
    this.updatePriceOnCountsChange(this.routePrice);
  }

  childrenCountChanged(count) {
    this.childrenCount = count;
    this.orderFerryForm.get('more').patchValue({children: count});
    this.updatePriceOnCountsChange(this.routePrice);
  }

  updatePriceOnCountsChange(dt) {
    if (dt && !isNaN(dt.single)) {
      this.routePrice = {total: (this.adultsCount + this.childrenCount) * dt.single, single: dt.single};
    }
  }

  selectLocation(location, dropdown = false) {
    console.log(this.selectedLocations)
    if (!this.selectedLocations.find(sl => sl.name === location.name)) {
      this.selectedLocations.push(location);

      const selectedLocationsLen = this.selectedLocations.length;

      if (selectedLocationsLen > 2 && selectedLocationsLen <= MAX_LOCATION_CHOICES &&
        selectedLocationsLen !== this.locations.controls.length) {
        this.addLocation();
      }

      if (!dropdown && selectedLocationsLen <= MAX_LOCATION_CHOICES) {

        const firstEmptyControl = this.locations.controls.find(c => !c.value.name);
        if (firstEmptyControl) {
          firstEmptyControl.patchValue(location);
        }

      }
      if (selectedLocationsLen <= MAX_LOCATION_CHOICES) {
        location.markerIconUrl = 'assets/icons/' + (location.markerIconUrl.includes('red') ? 'green' : 'red') + '_circle_small.png';
        // this.updateMapLocations();
        const validRoute = !this.locations.controls.find(c => !c.value.name);
        if (validRoute) {
          this.getRoutePrice();
        }
        // this.lines.push({lat: +location.latitude, lng: +location.longitude});
      }
    } else {
      const correspondingControl = this.locations.controls.find(c => c.value.name === location.name);
      location.markerIconUrl = 'assets/icons/' + (location.markerIconUrl.includes('red') ? 'green' : 'red') + '_circle_small.png';
      if (correspondingControl) {
        correspondingControl.patchValue({name: ''});
      } else {
        const firstEmptyControl = this.locations.controls.find(c => c.value.name === '');
        if (firstEmptyControl) {
          firstEmptyControl.patchValue(location);
        }
      }

      this.lines = this.lines.filter(l => {
        console.log(l.name, location.name)
        // const dirLat = +location.latitude;
        // const dirLng = +location.longitude;
        // return l.lng !== dirLng && l.lat !== dirLat;
        return !l.name.includes(location.name);
      });
      this.getRoutePrice();
    }

  }


  addLocation() {
    const locationsLen = this.locations.length;
    if (locationsLen < MAX_LOCATION_CHOICES) {
      this.locations.controls.push(this.createLocationsFormGroup());
    }
  }

  removeLocationInput(i) {
    this.locations.removeAt(i);
    this.updateMapLocations();
    this.getRoutePrice();
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

  resetForm() {
    this.orderFerryForm.reset();
    this.selectedLocations = [];
    this.lines = [];
    this.updateMapLocations();
  }

  getUserTodaysOrders() {
    if (this.authUser) {

      const sendData = {email: this.authUser.email, dateVal: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]')}
      this.ordersService.getUserActiveOrders(sendData).subscribe(dt => {

      });
    }
  }

  buy() {
    const name = 'Jane Doe';
    this.stripeService
      .createToken(this.card.getCard(), {name})
      .subscribe(result => {
        console.log(result)
        if (result.token) {
          // Use the token to create a charge or a customer
          // https://stripe.com/docs/charges
          console.log(result.token.id);
          this.usersService.createStripeCard({
            stripeToken: result.token.id,
            stripeEmail: this.authUser.email
          }).subscribe(dt => {

          });
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }


  get locations(): FormArray {
    return this.orderFerryForm.get('locations') as FormArray;
  }

}
