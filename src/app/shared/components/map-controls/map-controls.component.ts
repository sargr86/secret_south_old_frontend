import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MAP_CENTER_COORDINATES, MAX_LOCATION_CHOICES} from '@core/constants/settings';
import * as mapStylesData from '@app/maps/map_styles2.json';
import {FerriesService} from '@core/services/ferries.service';
import {DrawingControlOptions, OverlayType} from '@agm/drawing';
import {PolylineOptions} from '@agm/core/services/google-maps-types';
import {MatDialog} from '@angular/material/dialog';
import {SaveRouteDialogComponent} from '@core/components/dialogs/save-route-dialog/save-route-dialog.component';
import {ToastrService} from 'ngx-toastr';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-map-controls',
  templateUrl: './map-controls.component.html',
  styleUrls: ['./map-controls.component.scss']
})
export class MapControlsComponent implements OnInit {


  @Output('locationSelected') locationSelected = new EventEmitter();
  @Output('routeSelected') routeSelected = new EventEmitter();


  mapCenterCoordinates = MAP_CENTER_COORDINATES;
  mapStyles = mapStylesData;
  drawingEnabled = true;
  ferryMapLocations = [];
  selectedLocations = [];
  lines = [];
  linesArr = [];
  filteredLinesArr = [];
  markerIconUrl = 'assets/icons/green_circle_small.png';
  drawnLines = [];
  lineSymbol = {
    path: 'M 0,-1 0,1', strokeWeight: 1.5, scale: 2, strokeOpacity: 100
  };
  arrowSymbol = {
    path: 'M 0,0 1,4 -1,4 0,0 z', strokeOpacity: 1, strokeWeight: 1, fillOpacity: 100
  };
  drawingControlOptions: DrawingControlOptions = {drawingModes: [OverlayType.POLYLINE, OverlayType.MARKER]};
  routesListPanelClosed = false;

  polylineOptions: PolylineOptions = {
    strokeColor: '#8B0000',
    editable: true,
    draggable: true,
    strokeOpacity: 2,
    icons: [{
      icon: this.lineSymbol,
      offset: '0',
      repeat: '10px',

    }, {
      icon: this.arrowSymbol,
      offset: '100%',
      repeat: '100px',
    }],
  };
  strokesColor;
  selectedRoute;

  public pageSize = 5;
  public pageIndex = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private ferriesService: FerriesService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.getFerryMapLocations();
    if (this.drawingEnabled) {
      this.getAllRoutes();
    }
    this.strokesColor = this.drawingEnabled ? '#80b446' : '#8B0000';
  }

  getAllRoutes() {
    this.linesArr = [];
    this.ferriesService.getAllRoutes().subscribe((data: any) => {
      // this.linesArr = data;
      if (data) {
        data.map(dt => {

          if (dt.geometry_type === 'LineString') {
            dt.strokeColor = '#80b446';
            this.linesArr.push(dt);
          } else if (dt.geometry_type === 'Polygon') {
            const coordinates = [];
            Object.values(dt.coordinates[0]).reverse().map((c: any) => {
              if (c.lat) {
                coordinates.push({lat: +c.lat, lng: +c.lng});
              }
            });
            this.linesArr.push({
              coordinates: coordinates,
              name: dt.name,
              geometry_type: dt.geometry_type,
              strokeColor: '#80b446',
              _id: dt._id
            });
          }
        });

      }

      if (this.filteredLinesArr.length === 1) {
        --this.pageIndex;
      }
      this.filterRoutes();
    });
  }

  handle(e) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.filterRoutes();
  }

  filterRoutes() {
    this.filteredLinesArr = this.linesArr.slice(this.pageIndex * this.pageSize,
      this.pageIndex * this.pageSize + this.pageSize);
  }

  mapReady(e) {

  }

  mapClick(e) {

  }

  onMapReady(e) {
  }


  getFerryMapLocations() {
    this.ferriesService.getLocations().subscribe((dt: any) => {
      dt.map(d => {
        d.markerIconUrl = this.markerIconUrl;
        this.ferryMapLocations.push(d);
      });
    });
  }

  selectLocationOnMap(location) {

    if (!this.drawingEnabled) {


      const selectedLocationsLen = this.selectedLocations.length;
      if (selectedLocationsLen < MAX_LOCATION_CHOICES) {

        // Saving selected locations if not the same location point
        if (!this.selectedLocations.find(loc => loc === location)) {
          this.selectedLocations.push(location);
        }

        // Marking selected location with red color on the map
        this.ferryMapLocations.map(sl => {

          // Retrieve current location object
          const selectedLocation = this.selectedLocations.find(d => d.name === sl.name);
          sl.markerIconUrl = 'assets/icons/' + (selectedLocation ? 'red' : 'green') + '_circle_small.png';

        });

        if (this.selectedRouteValid) {
          this.getRouteLines();
        }

        this.locationSelected.emit({selectedLocations: this.selectedLocations});

      }
    }
  }

  get selectedRouteValid() {
    return this.selectedLocations.length > 1;
  }

  getRouteLines() {

    this.ferriesService.getRoutePrice(this.selectedLocations).subscribe((dt: any) => {
      this.linesArr = [];
      this.filteredLinesArr = [];
      this.lines = [];
      if (dt) {
        if (dt.geometry_type === 'LineString') {
          dt.coordinates.map(c => {
            this.lines.push({name: dt.name, lat: +c.lat, lng: +c.lng, strokeColor: '#80b446'});
          });
        } else if (dt.geometry_type === 'Polygon') {
          Object.values(dt.coordinates[0]).reverse().map((c: any) => {
            if (c.lat) {
              this.lines.push({name: dt.name, lat: +c.lat, lng: +c.lng, strokeColor: '#80b446'});
            }

          });
        }

      }
      this.linesArr.push(this.lines)
      this.filteredLinesArr = this.linesArr;
      console.log(this.filteredLinesArr)
      this.routeSelected.emit({selectedLocations: this.selectedLocations, routePriceData: dt});
    });
  }

  lineDragEnd(e, line) {
    console.log('drag end')
    let cs = [];
    console.log(line)
    // const coordinatesArray = e.getPath().getArray();
    // coordinatesArray.forEach((position) => {
    //   console.log('lat', position.lat());
    //   console.log('lng', position.lng());
    //   cs.push({latitude: position.lat(), longitude: position.lng()});
    // });
    // console.log(cs)
  }


  overlayComplete(e) {
    // console.log(e.overlay)
    if (e.overlay) {

      const coordinatesArray = e.overlay.getPath().getArray();
      const coordinates = [];
      coordinatesArray.forEach((position) => {
        // console.log('lat', position.lat());
        // console.log('lng', position.lng());
        coordinates.push({lat: position.lat(), lng: position.lng()});
      });
      this.drawnLines.push(e.overlay);
      this.closeFullscreen();
      this.dialog.open(SaveRouteDialogComponent, {
        data: {coordinates},
        width: '700px',
        height: '500px'
      }).afterClosed().subscribe((dt) => {
        this.linesArr = dt;
        this.removeDrawn();
        this.getAllRoutes();
      });
    }
  }

  /* Close fullscreen */
  closeFullscreen() {
    if (document.exitFullscreen && document.fullscreenElement !== null) {
      document.exitFullscreen();
    }
  }

  selectRoute(route) {
    this.selectedRoute = route;
    this.ferryMapLocations.map(location => {
      if ([route.start_point, route.end_point, route.stop_1, route.stop_2].includes(location.name)) {
        location.markerIconUrl = 'assets/icons/red_circle_small.png';
      } else {
        location.markerIconUrl = 'assets/icons/green_circle_small.png';
      }
    });
  }


  removeRoute(route) {
    // console.log(route)
    this.ferriesService.removeRoutePrice({id: route._id}).subscribe((dt: any) => {
      this.linesArr = dt;
      this.getAllRoutes();
      this.removeDrawn();
      this.toastr.success('Route and its details removed successfully!');
    });
  }


  removeDrawn() {
    this.drawnLines.map(overlay => {
      overlay.setMap(null);
    });
    this.drawnLines = [];
  }

  toggleRoutesListPanel() {
    this.routesListPanelClosed = !this.routesListPanelClosed;
    this.selectedRoute = null;
    this.ferryMapLocations.map(location => {
      location.markerIconUrl = 'assets/icons/green_circle_small.png';
    });
  }


}
