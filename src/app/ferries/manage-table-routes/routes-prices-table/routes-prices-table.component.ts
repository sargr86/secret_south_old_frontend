import {Component, OnInit, ViewChild} from '@angular/core';
import {GetTableDataSourcePipe} from '@shared/pipes/get-table-data-source.pipe';
import {FerriesService} from '@core/services/ferries.service';
import {MatPaginator} from '@angular/material/paginator';
import {CommonService} from '@core/services/common.service';
import {ROUTES_PRICES_TABLE_COLUMNS} from '@core/constants/global';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {SaveRouteDialogComponent} from '@core/components/dialogs/save-route-dialog/save-route-dialog.component';
import {ConfirmationDialogComponent} from '@shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-routes-prices-table',
  templateUrl: './routes-prices-table.component.html',
  styleUrls: ['./routes-prices-table.component.scss']
})
export class RoutesPricesTableComponent implements OnInit {

  dataSource;
  routesWithNoPriceLen;
  routesWithPricesLen;
  routesOnMap;
  displayedColumns = ROUTES_PRICES_TABLE_COLUMNS;
  paginationValues = [10, 25, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dataSrc: GetTableDataSourcePipe,
    private ferriesService: FerriesService,
    public common: CommonService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getAllRoutesPrices();
  }


  normalizeColName(col): string {
    col = `${col[0].toUpperCase()}${col.slice(1)}`;
    return col.replace(/_/g, ' ');
  }

  getAllRoutesPrices() {
    this.ferriesService.getAllRoutesPrices().subscribe((dt: any) => {
      this.generateTableList(dt);
    });
  }

  checkForCorrespondingRoute(row) {
    if (row['coordinates'] && row['coordinates'].length > 0) {
      return {status: 'yes', className: 'green'};
    }

    return {status: 'no', className: 'red'};
  }

  generateTableList(dt) {
    console.log('called')
    if (dt) {
      this.dataSource = this.dataSrc.transform(dt);
      console.log(this.dataSource)
      // const routesOnly = dt.filter(d => !d.hasOwnProperty('single') && !d.hasOwnProperty('return'));
      // this.routesWithNoPriceLen = routesOnly.length;
      // const routesWithPrices = dt.filter(d => d.hasOwnProperty('single') || d.hasOwnProperty('return'));
      // this.routesWithPricesLen = routesWithPrices.length;
      // const routesOnTheMap = dt.filter(d => d.coordinates && d.coordinates.length !== 0);
      // this.routesOnMap = routesOnTheMap.length;
      this.dataSource.paginator = this.paginator;
    }
  }

  removeRoutePrice(row) {
    this.dialog.open(ConfirmationDialogComponent, {}).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.ferriesService.removeRoutePrice({id: row.id}).subscribe(() => {
          this.toastr.success('The route info has been removed successfully from the map');
          this.getAllRoutesPrices();
        });
      }
    });

  }

  removeAllRoutesPrices() {
    this.dialog.open(ConfirmationDialogComponent, {}).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.ferriesService.removeAllRoutesPrices({}).subscribe(() => {
          this.toastr.success('All routes and their info have been removed successfully from the map');
          this.getAllRoutesPrices();
        });
      }
    });

  }

  addNewRouteWithoutMap() {
    this.dialog.open(SaveRouteDialogComponent, {
      data: {map: false, coordinates: []},
      width: '700px'
    }).afterClosed().subscribe((dt: any) => {
      this.generateTableList(dt);
    });
  }


  editRoutePrices(row) {
    console.log(row)
    this.dialog.open(SaveRouteDialogComponent, {
      data: {route: row, map: false},
      width: '800px'
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.toastr.success('The route details have been updated successfully');
      }
      this.getAllRoutesPrices();
    });
  }
}
