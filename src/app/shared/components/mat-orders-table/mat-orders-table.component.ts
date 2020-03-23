import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {OrdersService} from '@core/services/orders.service';
import {CommonService} from '@core/services/common.service';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {Socket} from 'ngx-socket-io';
import {SubjectService} from '@core/services/subject.service';
import {Router} from '@angular/router';
import {AuthService} from '@core/services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {DriverAssignmentDialogComponent} from '@core/components/dialogs/driver-assignment-dialog/driver-assignment-dialog.component';


@Component({
  selector: 'app-mat-orders-table',
  templateUrl: './mat-orders-table.component.html',
  styleUrls: ['./mat-orders-table.component.scss']
})
export class MatOrdersTableComponent implements OnInit, OnDestroy {
  @Input() status;
  displayedColumns = ['_id', 'client_full_name', 'phone', 'email', 'start_point', 'end_point', 'time', 'status', 'actions'];
  dataSource;
  filteredData;
  subscriptions: Subscription[] = [];

  constructor(
    private ordersService: OrdersService,
    public common: CommonService,
    private toastr: ToastrService,
    private subject: SubjectService,
    public socket: Socket,
    public router: Router,
    public auth: AuthService,
    private matDialog: MatDialog
  ) {
  }

  ngOnInit() {

    this.getOrders();

    // Getting orders of the changed tab
    this.subject.getOrderTypeData().subscribe(status => {
      this.status = status;
      this.getOrders();
    });


    this.socket.on('orderCreated', (data) => {
      const customer = data.order.client;
      if (customer) {
        this.toastr.success(`A new order has been created by: <strong>${customer.first_name}  ${customer.last_name}</strong>`,
          'Order created!', {enableHtml: true});
        this.getOrders();
      }
    });

    this.socket.on('orderTakenFinished', (data) => {
      console.log('order taken finished')
      this.getOrders();
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

  assignToDriver(row) {
    this.matDialog.open(DriverAssignmentDialogComponent, {
      data: {order_id: row._id},
      width: '500px',
      height: '400px'
    }).afterClosed().subscribe(dt => {
      const client = row.client;
      row['driver'] = dt.driver;
      this.socket.emit('driverAssigned', {driverOrder: dt, selectedOrder: row});
      this.socket.on('driverAssignmentFinished', (res) => {
        if (res) {
          this.toastr.success(`The order of customer <strong>${client.first_name} ${client.last_name}</strong>
            has been assigned to <strong>${dt.driver.full_name}</strong>`,
            '', {enableHtml: true})
          this.getOrders();
        }
      });
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
