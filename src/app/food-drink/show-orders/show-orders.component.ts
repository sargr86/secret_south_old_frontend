import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonService} from '@core/services/common.service';
import {ORDERS_TABLE_COLUMNS} from '@core/constants/global';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.scss']
})
export class ShowOrdersComponent implements OnInit, OnDestroy {
  displayedColumns = ORDERS_TABLE_COLUMNS;
  dataSource;
  filteredData;
  subscriptions: Subscription[] = [];
  constructor(
    private common: CommonService
  ) {
  }

  ngOnInit(): void {
    this.common.dataLoading = false;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.filteredData = this.dataSource.filteredData;
    // console.log(this.dataSource)
  }

  normalizeColName(col): string {
    col = `${col[0].toUpperCase()}${col.slice(1)}`;
    return col.replace(/_/g, ' ');
  }


  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
