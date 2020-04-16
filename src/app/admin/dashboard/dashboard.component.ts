import {Component, OnInit} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {CommonService} from '@core/services/common.service';
import {ToastrService} from 'ngx-toastr';
import {WebSocketService} from '@core/services/websocket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    public socket: Socket,
    public common: CommonService,
    private toastr: ToastrService,
    private webSocketService: WebSocketService
  ) {
  }

  ngOnInit() {
    this.common.dataLoading = false;
    this.webSocketService.on('orderCreated').subscribe((data: any) => {
      console.log(data)
      const customer = data.order.client;
      if (customer) {
        this.toastr.success(`A new order has been created by: <strong>${customer.first_name}  ${customer.last_name}</strong>`,
          'Order created!', {enableHtml: true});
      }
    });

  }


}
