import {Component, OnInit, ViewChild} from '@angular/core';
import {FerriesService} from '@core/services/ferries.service';
import {CommonService} from '@core/services/common.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {ROUTES_PRICES_TABLE_COLUMNS} from '@core/constants/settings';
import {MatPaginator} from '@angular/material/paginator';
import {GetTableDataSourcePipe} from '@shared/pipes/get-table-data-source.pipe';
import {Router} from '@angular/router';
import {AuthService} from '@core/services/auth.service';
import {ChangePricesDialogComponent} from '@core/components/dialogs/change-prices-dialog/change-prices-dialog.component';

@Component({
  selector: 'app-manage-prices',
  templateUrl: './manage-prices-routes.component.html',
  styleUrls: ['./manage-prices-routes.component.scss']
})
export class ManagePricesRoutesComponent implements OnInit {


  displayedColumns = ROUTES_PRICES_TABLE_COLUMNS;
  dataSource;
  paginationValues = [10, 25, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private ferriesService: FerriesService,
    public common: CommonService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public router: Router,
    public auth: AuthService,
    private dataSrc: GetTableDataSourcePipe,
    private dialog: MatDialog
  ) {
    this.common.dataLoading = false;

  }

  ngOnInit() {
    this.getAllRoutesPrices();
    // setTimeout(() => {
    //   this.matTabGroup._tabHeader.updatePagination();
    // }, 0);
  }

  normalizeColName(col): string {
    col = `${col[0].toUpperCase()}${col.slice(1)}`;
    return col.replace(/_/g, ' ');
  }

  getAllRoutesPrices() {
    this.ferriesService.getAllRoutesPrices().subscribe(dt => {
      this.dataSource = this.dataSrc.transform(dt);
      this.dataSource.paginator = this.paginator;
    });
  }
m
  editPrices(row) {
    this.dialog.open(ChangePricesDialogComponent, {data: row, width: '400px'});
  }

  removeRoutePrice(row) {
    this.ferriesService.removeRoutePrice({id: row._id}).subscribe(dt => {
      this.toastr.success('The route has been removed successfully from the map');
      this.getAllRoutesPrices();
    });
  }

}
