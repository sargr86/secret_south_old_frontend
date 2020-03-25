import {Component, OnInit} from '@angular/core';
import {CommonService} from '@core/services/common.service';
import {OrdersService} from '@core/services/orders.service';
import {SubjectService} from '@core/services/subject.service';
import {AuthService} from '@core/services/auth.service';
import * as jwtDecode from 'jwt-decode';
import {DRIVER_ORDER_TABS, OPERATOR_ORDER_TABS} from '@core/constants/settings';
import {Subscription} from 'rxjs';
import {count} from 'rxjs/operators';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.scss']
})
export class ShowOrdersComponent implements OnInit {
  orders;
  authUser;
  isOperator;
  tabs;
  selectedTab;
  subscriptions: Subscription[] = [];


  constructor(
    public common: CommonService,
    private ordersService: OrdersService,
    private subject: SubjectService,
    public auth: AuthService
  ) {


  }

  ngOnInit() {
    this.setUserTabs();
    this.getAllOrders();
  }

  setUserTabs() {
    this.authUser = jwtDecode(localStorage.getItem('token'));
    this.isOperator = this.authUser.position ? /Operator|Director/i.test(this.authUser.position.name) : false;
    this.selectedTab = this.isOperator ? 'Pending' : 'Assigned';
    this.tabs = this.isOperator ? OPERATOR_ORDER_TABS : DRIVER_ORDER_TABS;
  }

  tabChanged(e) {
    this.selectedTab = e.tab.textLabel;
    this.subject.setOrderTypeData(this.selectedTab.toLowerCase());
    this.getAllOrders();
  }

  getAllOrders(socketChanged = false) {
    const sendData = {};
    if (!this.isOperator) {
      sendData['driverEmail'] = this.authUser.email;
    }
    // Resetting all counts if socket changed
    if (socketChanged) {
      this.tabs = this.isOperator ? OPERATOR_ORDER_TABS : DRIVER_ORDER_TABS;
      this.tabs.map(tab => {
        tab.count = 0;
      });
    }
    this.subscriptions.push(this.ordersService.getStatusCounts(sendData).subscribe((dt: any) => {
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


      this.common.dataLoading = false;
    }));
  }

  getStatusName(tab) {
    return tab.toLowerCase();
  }
}
