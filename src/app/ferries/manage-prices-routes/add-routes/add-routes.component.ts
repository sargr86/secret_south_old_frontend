import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {FerriesService} from '@core/services/ferries.service';
import {MatDialog} from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';
import {FERRY_ROUTES_FILE_DROPZONE_CONFIG} from '@core/constants/settings';

@Component({
  selector: 'app-add-routes',
  templateUrl: './add-routes.component.html',
  styleUrls: ['./add-routes.component.scss']
})
export class AddRoutesComponent implements OnInit {
  selectedFile;
  ferryRoutesData = [];
  addMethod = 'map';
  downloadJsonHref;
  allRoutesPrices;
  dropzoneConfig = FERRY_ROUTES_FILE_DROPZONE_CONFIG;

  @Output('updated') routesUpdated = new EventEmitter();

  constructor(
    private toastr: ToastrService,
    private ferriesService: FerriesService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.ferriesService.getAllRoutes().subscribe((data: any) => {
      this.allRoutesPrices = data;
    });
  }

  onRoutesFileChanged(e, type = '') {
    this.selectedFile = e;
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, 'UTF-8');
    fileReader.onload = async () => {
      this.ferryRoutesData = JSON.parse(fileReader['result'] as any);
      this.importRoutes();
    };
    fileReader.onerror = (error) => {
      // this.toastr.error(error)
      console.log(error);
    };
  }


  importRoutes() {
    this.ferriesService.importRoutesFile(this.ferryRoutesData).subscribe(() => {
      this.toastr.success('Ferries routes data imported successfully');
      this.routesUpdated.emit();
    });
  }

  exportDataToJson() {
    const theJSON = JSON.stringify(this.allRoutesPrices);
    this.downloadJsonHref = this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,' + encodeURIComponent(theJSON));
  }

}
