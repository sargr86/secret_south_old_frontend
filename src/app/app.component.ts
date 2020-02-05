import {ChangeDetectorRef, Component, DoCheck, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AdminService} from './admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';
import {AuthService} from '@core/services/auth.service';
import {MatSidenav} from '@angular/material';
import {SubjectService} from '@core/services/subject.service';
import {ToastrService} from 'ngx-toastr';
import * as jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy, DoCheck {
  title = 'Secret South';
  routeSubscription: Subscription;
  pageTitle: string;
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    public Admin: AdminService,
    public router: Router,
    private route: ActivatedRoute,
    private _title: Title,
    public _auth: AuthService,
    private subject: SubjectService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {


    // Getting current page title
    this.routeSubscription = this.router.events.pipe(map(() => {
      let child = this.route.firstChild;
      while (child) {
        if (child.firstChild) {
          child = child.firstChild;
        } else if (child.snapshot.data && child.snapshot.data['title']) {
          return child.snapshot.data['title'];
        } else {
          return null;
        }
      }
      return null;
    })).subscribe(title => {
      this.pageTitle = title;
      this.setPageTitle();
      // this.sidenav.toggle();
      // this._subject.setPageTitle(title)
    });


  }

  ngOnInit(): void {
    this.subject.getSidebarAction().subscribe(action => {
      // this.closeSidenav(this.sidenav);
      // this.sidenav.toggle();
      if (this.sidenav.opened) {
        this.sidenav.close();
      } else {
        this.sidenav.open();
      }

    });
  }

  ngDoCheck(): void {

    const token = localStorage.getItem('token');

    if (token) {
      const decoded = jwtDecode(token);
      const dateEnd = decoded.exp;
      const dateNow = Date.now();

      if (dateEnd < dateNow / 1000) {
        this.toastr.error('Your session has been expired');
        this.router.navigate(['/']);
        localStorage.removeItem('usr');
      }

    }
  }


  /**
   * Sets current page title
   */
  setPageTitle() {
    if (this.pageTitle) {
      this._title.setTitle(this.pageTitle);
    }
  }

  getMode(sidenav) {

    // sidenav.toggle();
    if (this.responsiveMode && screen.width < 1060 && !this.router.url.includes('auth')) {
      return 'over';
    } else {
      return 'side';
    }
  }

  checkDashboardPage() {
    return /admin|partner|employee|customers/.test(this.router.url);
  }

  get responsiveMode() {

    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  closeSidenav(sidenav) {
    if (this.responsiveMode) {
      sidenav.close();
    }
  }


  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
