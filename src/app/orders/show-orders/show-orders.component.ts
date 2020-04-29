import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CommonService} from '@core/services/common.service';
import {OrdersService} from '@core/services/orders.service';
import {SubjectService} from '@core/services/subject.service';
import {AuthService} from '@core/services/auth.service';
import * as jwtDecode from 'jwt-decode';
import {DRIVER_ORDER_TABS, ALL_ORDER_TABS} from '@core/constants/settings';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChatService} from '@core/services/chat.service';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.scss']
})
export class ShowOrdersComponent implements OnInit, OnDestroy {
  orders;
  authUser;
  isDriver;
  isOperator;
  tabs;
  selectedTab;
  subscriptions: Subscription[] = [];
  userPosition;




  constructor(
    public common: CommonService,
    private ordersService: OrdersService,
    private subject: SubjectService,
    public auth: AuthService,
    private fb: FormBuilder,
    private chatService: ChatService
  ) {
  }

  ngOnInit() {
    this.setUserTabs();
    this.getStatusCounts();
    this.handleSocketEvents();
  }

  setUserTabs() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authUser = jwtDecode(token);
    }
    this.userPosition = this.authUser.position.name;
    this.isDriver = this.userPosition === 'Driver';
    this.isOperator = this.userPosition === 'Operator' || this.userPosition === 'Director';
    this.selectedTab = this.isDriver ? 'Assigned' : 'Pending';
    this.tabs = this.isDriver ? DRIVER_ORDER_TABS : ALL_ORDER_TABS;
  }

  tabChanged(e) {
    this.selectedTab = e.tab.textLabel;
    this.subject.setOrderTypeData(this.selectedTab.toLowerCase());
    this.getStatusCounts();
  }

  getStatusCounts(socketChanged = false) {
    const sendData = {};

    // For driver role sending his email
    if (this.isDriver) {
      sendData['driverEmail'] = this.authUser.email;
    } else if (this.userPosition === 'Customer') {
      sendData['customerEmail'] = this.authUser.email;
    }
    // Resetting all counts if socket changed
    if (socketChanged) {
      this.tabs = this.isDriver ? DRIVER_ORDER_TABS : ALL_ORDER_TABS;
      this.tabs.map(tab => {
        tab.count = 0;
      });
    }
    this.subscriptions.push(this.ordersService.getStatusCounts(sendData).subscribe((dt: any) => {
      if (dt) {

        dt.statuses.map(d => {
          this.tabs.map(tab => {
            const tabName = tab.name.toLowerCase();
            if (d.name === tabName) {
              tab.count = d.count;
            } else if (tabName === 'all') {
              tab.count = dt.count;
            }
          });
        });
      }


      this.common.dataLoading = false;
    }));
  }

  getStatusName(tab) {
    return tab.toLowerCase();
  }


  handleSocketEvents() {


  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
