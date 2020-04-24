import {Component, OnInit} from '@angular/core';
import {FerriesService} from '@core/services/ferries.service';
import {CommonService} from '@core/services/common.service';
import {ToastrService} from 'ngx-toastr';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-edit-routes-prices',
  templateUrl: './import-edit-routes-prices.component.html',
  styleUrls: ['./import-edit-routes-prices.component.scss']
})
export class ImportEditRoutesPricesComponent implements OnInit {
  selectedFile;
  ferryRoutesData = [];
  ferryPricesData = [];

  constructor(
    private ferriesService: FerriesService,
    public common: CommonService,
    private toastr: ToastrService
  ) {
    this.common.dataLoading = false;
  }

  ngOnInit() {
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

  onPricesFileChanged(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, {type: 'binary'});
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];


        if (name === 'Pricing') {
          const json = XLSX.utils.sheet_to_json(sheet);
          let str = JSON.stringify(json);
          json.map(j => {
            Object.keys(j).map(k => {
              str = str.replace(k, k.replace(/ /g, '_').toLowerCase());
            });
          });

          initial = JSON.parse(str);

        }
        return initial;
      }, {});
      this.ferryPricesData = jsonData;
      const dataString = JSON.stringify(jsonData);
    };
    reader.readAsBinaryString(file);
  }

  importRoutes() {
    this.ferriesService.importRoutesFile(this.ferryRoutesData).subscribe(dt => {
      this.toastr.success('Ferries routes data imported succcessfully');
    });
  }

  importPrices() {
    this.ferriesService.importPricesFile(this.ferryPricesData).subscribe(dt => {
      this.toastr.success('Ferries prices data imported succcessfully');
    });
  }
}
