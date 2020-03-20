import {Component, OnInit} from '@angular/core';
import {CommonService} from '@core/services/common.service';
import {OrdersService} from '@core/services/orders.service';
import {ToastrService} from 'ngx-toastr';
import {Socket} from 'ngx-socket-io';
import {SubjectService} from '@core/services/subject.service';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.scss']
})
export class ShowOrdersComponent implements OnInit {
  orders;
  links = ['pending', 'ongoing', 'cancelled'];
  selectedTab = 'Pending';


  constructor(
    public common: CommonService,
    private ordersService: OrdersService,
    private subject: SubjectService
  ) {
  }

  ngOnInit() {

  }

  tabChanged(e) {
    this.selectedTab = e.tab.textLabel.toLowerCase();
    this.subject.setOrderTypeData(this.selectedTab);
    // this.getOrders({status: this.selectedTab});
  }

  getOrders(status) {
  }
}
