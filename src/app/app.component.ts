import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';
import {AuthService} from '@core/services/auth.service';
import {MatSidenav} from '@angular/material';
import {SubjectService} from '@core/services/subject.service';
import {ToastrService} from 'ngx-toastr';
import * as jwtDecode from 'jwt-decode';
import {CommonService} from '@core/services/common.service';
import {Socket} from 'ngx-socket-io';
import {WebSocketService} from '@core/services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy, AfterContentChecked {
  title = 'Secret South';
  routeSubscription: Subscription;
  pageTitle: string;
  authUser;
  userPosition;
  isDriver;
  isOperator;
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private _title: Title,
    public _auth: AuthService,
    private subject: SubjectService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    public common: CommonService,
    private cdref: ChangeDetectorRef,
    // private socket: Socket
    private webSocketService: WebSocketService
  ) {

    this.common.dataLoading = true;

    const token = localStorage.getItem('token');
    if (token) {
      this.authUser = jwtDecode(token);
      this.userPosition = this.authUser.position.name;
      this.isDriver = this.userPosition === 'Driver';
      this.isOperator = this.userPosition === 'Operator' || this.userPosition === 'Director';
    }

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

    this.socketNewUser();

    // setInterval(() => {
    //   this.socketNewUser(true);
    // }, 1800000)

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

  socketNewUser(refresh = false) {
    if (this._auth.loggedIn()) {
      // this.socket.connect();
      if (this.isOperator) {
        this.webSocketService.emit('newUser', {
          socket_nickname: 'Operator',
          id: this.authUser.id,
          email: this.authUser.email
        });
      } else {
        this.webSocketService.emit('newUser', this.authUser);
        this.handleSocketEvents();
      }
    }
  }

  handleSocketEvents() {
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  // ngDoCheck(): void {
  //
  //   const token = localStorage.getItem('token');
  //
  //   if (token) {
  //     const decoded = jwtDecode(token);
  //     const dateEnd = decoded.exp;
  //     const dateNow = Date.now();
  //
  //     if (dateEnd < dateNow / 1000) {
  //       this.toastr.error('Your session has been expired');
  //       this.router.navigate(['/']);
  //       localStorage.removeItem('token');
  //     }
  //
  //   }
  // }


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
