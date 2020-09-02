import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonService} from '@core/services/common.service';
import {ORDERS_TABLE_COLUMNS} from '@core/constants/global';
import {Subscription} from 'rxjs';
import {WebSocketService} from '@core/services/websocket.service';
import {GetTableDataSourcePipe} from '@shared/pipes/get-table-data-source.pipe';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.scss']
})
export class ShowOrdersComponent implements OnInit, OnDestroy {
  displayedColumns = ORDERS_TABLE_COLUMNS;
  dataSource = this.getTableData.transform([]);
  filteredData;
  subscriptions: Subscription[] = [];

  constructor(
    public common: CommonService,
    private websocketService: WebSocketService,
    private getTableData: GetTableDataSourcePipe
  ) {
  }

  ngOnInit(): void {
    this.common.dataLoading = false;
    this.websocketService.on('reserve-a-table').subscribe(data => {
      this.dataSource.data.push(data);
      console.log(this.dataSource)
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.filteredData = this.dataSource.filteredData;
  }

  normalizeColName(col): string {
    col = `${col[0].toUpperCase()}${col.slice(1)}`;
    return col.replace(/_/g, ' ');
  }

  acceptOrder(order) {
    this.websocketService.emit('accept-order', order);
  }

  rejectOrder(order) {
    this.websocketService.emit('reject-order', order);
  }


  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
