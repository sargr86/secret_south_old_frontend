import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MAIN_SECTIONS, TIMEPICKER_THEME} from '@core/constants/settings';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {COUNTRY_RESTRICTED_PLACES} from '@core/helpers/google-one-country-places-getter';
import {Router} from '@angular/router';
import {AuthService} from '@core/services/auth.service';
import {MainService} from '../../home/services/main.service';
import {SubjectService} from '@core/services/subject.service';
import IsResponsive from '@core/helpers/is-responsive';

@Component({
  selector: 'app-ferries-header',
  templateUrl: './ferries-header.component.html',
  styleUrls: ['./ferries-header.component.scss']
})
export class FerriesHeaderComponent implements OnInit {

  mainSections = MAIN_SECTIONS;
  mapForm: FormGroup;
  latlng: any = [];
  lat = 0;
  lng = 0;
  subscriptions: Subscription[] = [];
  routerUrl: string;
  selectedSection = 'Ferries';
  responsiveMode: boolean;
  countryRestrictedPlaces = COUNTRY_RESTRICTED_PLACES as any;
  personsCount = 2;
  timepickerTheme = TIMEPICKER_THEME;
  orderFerryForm: FormGroup;
  ferryDirections;

  @Output() toggle = new EventEmitter();

  constructor(
    public router: Router,
    public auth: AuthService,
    private fb: FormBuilder,
    private main: MainService,
    private subject: SubjectService
  ) {
    this.orderFerryForm = this.fb.group({
      startPoint: [''],
      endPoint: [''],
      time: [''],
      oneWay: [true]
    });

  }

  ngOnInit() {

    this.main.getDirections().subscribe(dt => {
      this.ferryDirections = dt;
    });

    // Checking for responsive mode and initializing map form
    this.responsiveMode = IsResponsive.check();
    this.mapForm = this.fb.group({
      type: ['']
    });
  }


  toggleSidebar() {
    this.subject.setSidebarAction('toggle');
    this.toggle.emit();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  navigateToDashboard() {
    const role = this.auth.checkRoles('admin') ? 'admin' : (this.auth.checkRoles('partner') ? 'partners' : 'employees');
    this.router.navigate([`${role}/dashboard/show`]);
  }

  getStartDate() {

  }

  timeChanged(time) {
    this.orderFerryForm.patchValue({time});
  }

  searchFerries() {
    console.log(this.orderFerryForm.value)
    setInterval(() => {
      document.getElementById('order-info-container').scrollIntoView({behavior: 'smooth'});
      this.subject.setOrderData(this.orderFerryForm.value)
    }, 500);
  }

  personsCountChanged(e) {

  }

}
