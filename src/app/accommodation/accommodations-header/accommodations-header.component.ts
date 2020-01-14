import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '@core/services/auth.service';
import IsResponsive from '@core/helpers/is-responsive';
import {MAIN_SECTIONS} from '@core/constants/settings';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MainService} from '../../home/services/main.service';
import {SubjectService} from '@core/services/subject.service';
import {COUNTRY_RESTRICTED_PLACES} from '@core/helpers/google-one-country-places-getter';
import {MatDatepicker} from '@angular/material/datepicker';
import {Options} from 'ngx-google-places-autocomplete/objects/options/options';

@Component({
  selector: 'app-accommodations-header',
  templateUrl: './accommodations-header.component.html',
  styleUrls: ['./accommodations-header.component.scss']
})
export class AccommodationsHeaderComponent implements OnInit {
  mainSections = MAIN_SECTIONS;
  mapForm: FormGroup;

  subscriptions: Subscription[] = [];
  routerUrl: string;
  selectedSection = 'Accommodations';
  responsiveMode: boolean;
  countryRestrictedPlaces = COUNTRY_RESTRICTED_PLACES as Options;

  @Output() toggle = new EventEmitter();

  personsCount = 2;

  constructor(
    public router: Router,
    public auth: AuthService,
    private _fb: FormBuilder,
    private main: MainService,
    private subject: SubjectService
  ) {

  }

  private myVar;

  ngOnInit() {

    // Checking for responsive mode and initializing map form
    this.responsiveMode = IsResponsive.check();
    this.mapForm = this._fb.group({
      type: ['']
    });
  }

  toggleSidebar() {
    this.toggle.emit();
  }

  getPicker(p) {
    return p as MatDatepicker<string>;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  /**
   * Navigates to the user dashboard
   */
  navigateToDashboard() {
    const role = this.auth.checkRoles('admin') ? 'admin' : (this.auth.checkRoles('partner') ? 'partners' : 'employees');
    this.router.navigate([`${role}/dashboard/show`]);
  }

  getStartDate() {

  }

  dateChanged() {

  }

  searchAccommodations() {
    this.router.navigate(['accommodations/list']);
  }

  personsCountChanged(e) {

  }

}
