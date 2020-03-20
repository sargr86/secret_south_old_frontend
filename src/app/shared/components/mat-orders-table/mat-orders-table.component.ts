import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {OrdersService} from '@core/services/orders.service';
import {CommonService} from '@core/services/common.service';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {Socket} from 'ngx-socket-io';
import {SubjectService} from '@core/services/subject.service';


@Component({
  selector: 'app-mat-orders-table',
  templateUrl: './mat-orders-table.component.html',
  styleUrls: ['./mat-orders-table.component.scss']
})
export class MatOrdersTableComponent implements OnInit, OnDestroy {
  @Input() status;
  displayedColumns = ['client_full_name', 'phone', 'email', 'start_point', 'end_point', 'time', 'status'];
  dataSource;
  filteredData;
  subscriptions: Subscription[] = [];

  constructor(
    private ordersService: OrdersService,
    public common: CommonService,
    private toastr: ToastrService,
    private subject: SubjectService,
    public socket: Socket,
  ) {
  }

  ngOnInit() {

    this.getOrders();


    this.socket.on('orderCreated', (data) => {
      console.log(data)
      const customer = data.order.client;
      if (customer) {
        this.toastr.success(`A new order has been created by: <strong>${customer.first_name}  ${customer.last_name}</strong>`,
          'Order created!', {enableHtml: true});
        this.getOrders();
      }
    });
  }

  getOrders() {
    this.subscriptions.push(this.ordersService.get({status: this.status}).subscribe(dt => {
      this.common.dataLoading = false;
      this.dataSource = dt;
    }));
  }

  normalizeColName(col): string {
    col = `${col[0].toUpperCase()}${col.slice(1)}`;
    return col.replace(/_/g, ' ');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.filteredData = this.dataSource.filteredData;
    // console.log(this.dataSource)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
