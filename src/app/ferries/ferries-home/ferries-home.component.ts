import {Component, OnInit} from '@angular/core';
import {MainService} from '../../home/services/main.service';
import {ToastrService} from 'ngx-toastr';
import * as mapStylesData from '../../maps/map_styles2.json';
import {API_URL} from '@core/constants/settings';
import {FerryService} from '@core/services/ferry.service';
import {Ferry} from '@shared/models/Ferry';
import {NgxGalleryOptions} from 'ngx-gallery';
import {AuthService} from '@core/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as jwtDecode from 'jwt-decode';
import {CommonService} from '@core/services/common.service';
import {SubjectService} from '@core/services/subject.service';
import {FormBuilder} from '@angular/forms';

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
  orderForm;

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
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.getFerryLocations();
    this.getFerryDirections();
    this.getOrderData();
    this.mapStyles = mapStylesData['default'];
    this.selectAction = this.selectedFerry ? 'Cancel' : 'Select';
    this.common.dataLoading = false;

    this.orderForm = this.fb.group({
      startPoint: [''],
      endPoint: [''],
      time: [''],
      oneWay: [true]
    });

    // Saving social auth access token to local storage
    const token = this.route.snapshot.queryParams.token;
    if (token) {
      localStorage.setItem('token', token);
    }
  }

  getOrderData() {
    this.subject.getOrderData().subscribe(dt => {
      this.orderData = dt;
      this.orderForm.patchValue(dt);
    });
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
    this.main.getDirections().subscribe(dt => {
      this.ferryDirections = dt;
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
    this.lines.push({lat: +direction.lat, lng: +direction.lng});
  }

  removeDirection(direction) {
    this.lines = this.lines.filter(l => {
      const dirLat = +direction.lat;
      const dirLng = +direction.lng;
      return l.lng !== dirLng && l.lat !== dirLat;
    });
  }
}
