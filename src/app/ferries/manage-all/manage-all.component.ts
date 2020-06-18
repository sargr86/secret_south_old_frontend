import {Component, OnInit} from '@angular/core';
import {CommonService} from '@core/services/common.service';
import {ToastrService} from 'ngx-toastr';
import {FerriesService} from '@core/services/ferries.service';
import {MatDialog} from '@angular/material/dialog';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {SaveRouteDialogComponent} from '@core/components/dialogs/save-route-dialog/save-route-dialog.component';

@Component({
  selector: 'app-manage-all',
  templateUrl: './manage-all.component.html',
  styleUrls: ['./manage-all.component.scss']
})
export class ManageAllComponent implements OnInit {

  importMethod: string;
  mapAction: string;
  allRoutesPrices;
  downloadJsonHref: SafeUrl;
  viewSummary = true;

  constructor(
    public common: CommonService,
    private toastr: ToastrService,
    private ferriesService: FerriesService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit(): void {
    this.common.dataLoading = false;

    this.ferriesService.getAllRoutes().subscribe((data: any) => {
      this.allRoutesPrices = data;
    });
  }

  changeImportMethod(method) {
    this.importMethod = method;
    this.mapAction = null;
    this.viewSummary = false;
  }

  changeMapAction(action) {
    this.mapAction = action;
    this.importMethod = null;
    this.viewSummary = false;
  }

  viewRoutesPricesTable() {
    this.viewSummary = true;
    this.importMethod = null;
    this.mapAction = null;
  }



  exportDataToJson() {
    const theJSON = JSON.stringify(this.allRoutesPrices);
    console.log(theJSON)
    this.downloadJsonHref = this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,' + encodeURIComponent(theJSON));
  }

}
