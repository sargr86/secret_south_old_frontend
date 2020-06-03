import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ManageRoutesComponent} from '@app/ferries/manage-routes/manage-routes.component';
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
    console.log(e)
    this.selectedFile = e;
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, 'UTF-8');
    fileReader.onload = async () => {


      const json = JSON.parse(fileReader['result'] as any);
      console.log(json)

      // For geojson file
      if (json.hasOwnProperty('features')) {


        json.features.map(async (feature) => {
          const geometryType = feature.geometry.type;
          if (geometryType !== 'Point') {
            const routeName = feature.properties.Name;
            const routeNameParts = routeName.split('-').map(function (item) {
              return item.trim();
            });
            const coordinates = feature.geometry.coordinates;
            if (geometryType === 'LineString') {
              const cs = [];
              coordinates.map(c => {
                cs.push({lat: c[1], lng: c[0]});
              });

              this.ferryRoutesData.push({
                name: routeName,
                start_point: routeNameParts[0],
                stop_1: '',
                stop_2: '',
                end_point: routeNameParts[1],
                geometry_type: geometryType,
                coordinates: cs,
                // single: '',
                // total: '',
                // min_people: 6
              });
            } else if (geometryType === 'Polygon') {
              const cs = [];
              coordinates.map(coordinate => {
                const polygonCoordinates = [];
                coordinate.map(c => {
                  polygonCoordinates.push({lat: c[1], lng: c[0]});
                });
                cs.push(polygonCoordinates);
              });
              this.ferryRoutesData.push({
                name: routeName,
                start_point: routeNameParts[0],
                stop_1: routeNameParts[1] ? routeNameParts[1] : '',
                stop_2: routeNameParts[2] ? routeNameParts[2] : '',
                end_point: routeNameParts[3] ? routeNameParts[3] : '',
                geometry_type: geometryType,
                coordinates: cs,
                // single: '',
                // total: '',
                // min_people: 6
              });
            }

          }

        });

      } else {
        this.ferryRoutesData = json;
        this.importRoutes();
      }
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


  openMap() {
    this.addMethod = 'map';
    this.dialog.open(ManageRoutesComponent, {data: {}, width: '900px'});
  }

  exportDataToJson() {
    const theJSON = JSON.stringify(this.allRoutesPrices);
    this.downloadJsonHref = this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,' + encodeURIComponent(theJSON));
  }

}
