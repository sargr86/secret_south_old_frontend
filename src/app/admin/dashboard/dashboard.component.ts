import {Component, OnInit} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {CommonService} from '@core/services/common.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    public socket: Socket,
    public common: CommonService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.common.dataLoading = false;
    this.socket.on('orderCreated', (data) => {
      console.log(data)
      const customer = data.order.client;
      if (customer) {
        this.toastr.success(`A new order has been created by: <strong>${customer.first_name}  ${customer.last_name}</strong>`,
          'Order created!', {enableHtml: true});
      }
    });

  }


}
