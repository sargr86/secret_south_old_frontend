import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MainService} from '@core/services/main.service';
import {ToastrService} from 'ngx-toastr';
import * as mapStylesData from '../../maps/map_styles2.json';
import {
  DEFAULT_ADULTS_COUNT, DEFAULT_CHILDREN_COUNT,
  STRIPE_CARD_OPTIONS
} from '@core/constants/global';

import {FerriesService} from '@core/services/ferries.service';
import {Ferry} from '@shared/models/Ferry';
import {AuthService} from '@core/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as jwtDecode from 'jwt-decode';
import {CommonService} from '@core/services/common.service';
import {SubjectService} from '@core/services/subject.service';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrdersService} from '@core/services/orders.service';
import moment from 'moment';
import {WebSocketService} from '@core/services/websocket.service';
import {AgmMap} from '@agm/core';
import {StripeCardComponent, StripeService} from 'ngx-stripe';
import {UsersService} from '@core/services/users.service';
import {DEFAULT_LOCATIONS_CHOICES, MAX_LOCATION_CHOICES} from '@core/constants/map';
import {Subscription} from 'rxjs';
import {getFerryLocationsFormGroup} from '@core/constants/ferries_order_form';
import {CreateFerryOrderFormFieldsService} from '@core/helpers/create-ferry-order-form-fields.service';

declare const google: any;

@Component({
  selector: 'app-ferries-home',
  templateUrl: './ferries-home.component.html',
  styleUrls: ['./ferries-home.component.scss']
})
export class FerriesHomeComponent implements OnInit, OnDestroy {

  ferryDirections;
  ferryMapDirections = [];
  lines = [];
  mapStyles;
  selectedFerry = null;
  selectAction;

  orderFerryForm: FormGroup;
  chatForm: FormGroup;
  adultsCount = DEFAULT_ADULTS_COUNT;
  childrenCount = DEFAULT_CHILDREN_COUNT;
  oneWayTrip = true;
  authUser;
  roomName;
  maxLocationsChoices = MAX_LOCATION_CHOICES;
  selectedLocations = [];
  routePrice = {total: 0, single: 0, return: 0};
  locationSelected = false;
  routeValid = false;
  routeFound = false;
  markerIconUrl = 'assets/icons/green_circle_small.png';
  sortedLocations = [];
  subscriptions: Subscription[] = [];

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
  };

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
    private usersService: UsersService,
    private getFormFields: CreateFerryOrderFormFieldsService
  ) {

    this.getUserTodaysOrders();
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.authUser = jwtDecode(token);
    }
    this.getFerryDirections();
    this.getFerryMapDirections();
    this.initOrderForm();
    this.saveSocialAuthToken();
    this.handleSocketEvents();
    this.mapStyles = mapStylesData['default'];
    this.selectAction = this.selectedFerry ? 'Cancel' : 'Select';
    this.common.dataLoading = false;

    // Getting clicks on ferry port locations from the map controls component
    this.subscriptions.push(this.subject.getMapData().subscribe((dt: any) => {

      if (!dt.formToMap) {
        this.selectedLocations = dt.selectedLocations;
        this.selectLocation(dt.currentLocation);
      }
    }));

    this.subscriptions.push(this.subject.getFerryOrderPrice().subscribe((dt: any) => {
      if (!dt) {
        this.routePrice = {total: 0, single: 0, return: 0};
        this.routeFound = false;
      }
    }));
  }

  handleSocketEvents() {

    this.webSocketService.on('orderCreated').subscribe(async (data) => {
      if (this.authUser.position.name === 'Customer') {
        await this.router.navigate(['customers/orders/show']);
      }
    });


  }

  initOrderForm() {
    this.orderFerryForm = this.getFormFields.get();
    this.chatForm = this.fb.group({message: ['', Validators.required]});
  }

  // Saving social auth access token to local storage
  saveSocialAuthToken() {
    const token = this.route.snapshot.queryParams.token;
    if (token) {
      localStorage.setItem('token', token);
    }
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

  getLabelText(i) {
    if (i === 0) {
      return 'From';
    } else if (i === 1) {
      return 'To';
    }
  }

  getPlaceholderText(i) {
    const text = 'Departure port';
    const locationsLen = this.locations.length;
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


  locationChanged(val, i) {

    // Patching drop down value
    this.locations.controls[i].patchValue({name: val});

    this.updateMapLocations();
    this.locationSelected = true;

    this.oneWayTrip = this.startLocation.value.name !== this.endLocation.value.name;
    this.routeValid = !this.locations.controls.find(c => !c.value.name);

    if (this.routeValid) {
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

    this.subject.setMapData({selectedLocations: this.selectedLocations, formToMap: true});


  }

  getRoutePrice() {
    const selectedLocations = this.sortLocations(this.orderFerryForm.getRawValue()['locations']);

    this._ferries.getRoutePrice(selectedLocations).subscribe((dt: any) => {
      this.routeFound = true;
      this.updatePriceOnCountsChange(dt);
      this.subject.setMapLinesData(dt);
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
      const onePersonPrice = dt.single || dt.return;
      this.routePrice = {
        total: (this.adultsCount + this.childrenCount) * onePersonPrice,
        single: dt.single,
        return: dt.return
      };
    }
  }

  selectLocation(location) {

    this.locationSelected = true;

    const selectedMapLocationsLen = this.selectedLocations.length;

    if (selectedMapLocationsLen <= MAX_LOCATION_CHOICES) {

      // Adding a new dropdown if map locations count is more than default locations choices count (2)
      if (selectedMapLocationsLen > DEFAULT_LOCATIONS_CHOICES) {
        this.addLocation();
      }

      // Finding first empty dropdown (if exists) and patching the location value to it
      const firstEmptyControl = this.locations.controls.find(c => !c.value.name);

      if ([1, 2].indexOf(selectedMapLocationsLen) !== -1) {
        if (firstEmptyControl) {
          firstEmptyControl.patchValue({name: location.name});
        }
      } else if ([3, 4].indexOf(selectedMapLocationsLen) !== -1) {
        this.swapControlsValues(selectedMapLocationsLen === 3 ? 'Stop 1' : 'Stop 2', location);
      }

      // Checking if selected route is valid and getting its price
      const validRoute = !this.locations.controls.find(c => !c.value.name);
      if (validRoute) {
        this.getRoutePrice();
      }
    }

  }

  swapControlsValues(swapName, location) {
    const lastEndControl = this.locations.controls.find(c => c.value.title === 'End');
    const locationsLen = this.locations.controls.length;
    const previousEnd = lastEndControl.value.name;
    const swapControl = this.locations.controls.find(c => c.value.title === swapName);
    swapControl.patchValue({name: previousEnd, title: swapName, order: locationsLen - 2});
    lastEndControl.patchValue({name: location.name, order: locationsLen - 1});
  }


  // }
  //
  //   if (selectedLocationsLen <= MAX_LOCATION_CHOICES) {
  //
  //     const firstEmptyControl = this.locations.controls.find(c => !c.value.name);
  //     console.log(firstEmptyControl)
  //     // console.log(this.locations.controls)
  //     if (firstEmptyControl) {
  //       firstEmptyControl.patchValue({name: location});
  //     }
  //
  //   }
  //   if (selectedLocationsLen <= MAX_LOCATION_CHOICES) {
  //     location.markerIconUrl = 'assets/icons/' + (location.markerIconUrl.includes('red') ? 'green' : 'red') + '_circle_small.png';
  //     // this.updateMapLocations();
  //     const validRoute = !this.locations.controls.find(c => !c.value.name);
  //     if (validRoute) {
  //       this.getRoutePrice();
  //     }
  //     // this.lines.push({lat: +location.latitude, lng: +location.longitude});
  //   }
  // } else if (location) {
  //   console.log('found')
  //   console.log(location)
  //   const correspondingControl = this.locations.controls.find(c => c.value.name === location.name);
  //   // location.markerIconUrl = 'assets/icons/' + (location.markerIconUrl.includes('red') ? 'green' : 'red') + '_circle_small.png';
  //   if (correspondingControl) {
  //     correspondingControl.patchValue({name: ''});
  //   } else {
  //     const firstEmptyControl = this.locations.controls.find(c => c.value.name === '');
  //     console.log(firstEmptyControl)
  //     if (firstEmptyControl) {
  //       firstEmptyControl.patchValue(location);
  //     }
  //   }
  //
  //   this.lines = this.lines.filter(l => {
  //     console.log(l.name, location.name)
  //     // const dirLat = +location.latitude;
  //     // const dirLng = +location.longitude;
  //     // return l.lng !== dirLng && l.lat !== dirLat;
  //     return !l.name.includes(location.name);
  //   });
  //
  //   this.routeValid = !this.locations.controls.find(c => !c.value.name);
  //   if (this.routeValid) {
  //     this.getRoutePrice();
  //   }
  // }


  addLocation() {
    const locationsLen = this.locations.length;
    if (locationsLen < MAX_LOCATION_CHOICES) {
      const name = 'Stop ' + (locationsLen - 1);
      this.locations.controls.push(this.fb.group(getFerryLocationsFormGroup(name, this.locations.length - 1)));
      this.getLocationCtrlByName('End').patchValue({order: this.locations.length});
    }
  }

  sortLocations(locations) {
    return locations.sort((a, b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0));
  }

  removeLocationInput(i) {
    this.locations.removeAt(i);
    this.updateMapLocations();
    this.getRoutePrice();
  }

  getStartDate() {

  }

  dateChanged(e) {

  }


  personsCountChanged(count) {
    this.orderFerryForm.get('more').patchValue({children: count});
  }

  timeChanged(time, input) {
    this.orderFerryForm.patchValue({input: time});
  }

  wayTypeChanged() {
    this.oneWayTrip = this.startLocation.value.name !== this.endLocation.value.name;
    this.orderFerryForm.patchValue({wayType: this.oneWayTrip ? 1 : 2});
  }


  orderFerry() {
    const formValue = this.orderFerryForm.getRawValue();
    formValue.locations = this.sortLocations(formValue.locations);

    console.log(formValue)
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

  resetForm() {
    this.orderFerryForm.reset();
    this.selectedLocations = [];
    this.lines = [];
    this.routePrice = {total: 0, single: 0, return: 0};
    this.updateMapLocations();
    this.initOrderForm();
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

  get endTime(): AbstractControl {
    return this.orderFerryForm.get('end_time');
  }

  get startTime(): AbstractControl {
    return this.orderFerryForm.get('start_time');
  }

  get startLocation(): AbstractControl {
    return this.getLocationCtrlByName('Start');
  }

  get endLocation(): AbstractControl {
    return this.getLocationCtrlByName('End');
  }

  getLocationCtrlByName(name) {
    return this.locations.controls.find(c => c.value.title === name);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
