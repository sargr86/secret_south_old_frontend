import {Component, OnInit} from '@angular/core';
import {ManageRoutesComponent} from '@app/ferries/manage-routes/manage-routes.component';
import {ToastrService} from 'ngx-toastr';
import {FerriesService} from '@core/services/ferries.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-add-routes',
  templateUrl: './add-routes.component.html',
  styleUrls: ['./add-routes.component.scss']
})
export class AddRoutesComponent implements OnInit {
  selectedFile;
  ferryRoutesData = [];
  addMethod = 'map';

  constructor(
    private toastr: ToastrService,
    private ferriesService: FerriesService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  onRoutesFileChanged(e, type) {
    this.selectedFile = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, 'UTF-8');
    fileReader.onload = async () => {


      const json = JSON.parse(fileReader['result'] as any);

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

    };
    fileReader.onerror = (error) => {
      // this.toastr.error(error)
      console.log(error);
    };
  }


  importRoutes() {
    this.ferriesService.importRoutesFile(this.ferryRoutesData).subscribe(dt => {
      this.toastr.success('Ferries routes data imported succcessfully');
    });
  }


  openMap() {
    this.addMethod = 'map';
    this.dialog.open(ManageRoutesComponent, {data: {}, width: '900px'});
  }

}
