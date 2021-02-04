import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {
  MAP_CENTER_COORDINATES,
  MAP_GREEN_COLOR,
  MAP_MARKER_ICON_URL,
  MAP_POLYLINE_OPTIONS,
  MAP_RED_COLOR,
  MAX_LOCATION_CHOICES
} from '@core/constants/map';
import * as mapStylesData from '@app/maps/map_styles2.json';
import {FerriesService} from '@core/services/ferries.service';
import {DrawingControlOptions, OverlayType} from '@agm/drawing';
import {MatDialog} from '@angular/material/dialog';
import {SaveRouteDialogComponent} from '@core/components/dialogs/save-route-dialog/save-route-dialog.component';
import {ToastrService} from 'ngx-toastr';
import {MatPaginator} from '@angular/material/paginator';
import {ConfirmationDialogComponent} from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import {SaveLocationDialogComponent} from '@core/components/dialogs/save-location-dialog/save-location-dialog.component';
import {SubjectService} from '@core/services/subject.service';

@Component({
  selector: 'app-map-controls',
  templateUrl: './map-controls.component.html',
  styleUrls: ['./map-controls.component.scss']
})
export class MapControlsComponent implements OnInit {


  @Output('locationSelected') locationSelected = new EventEmitter();
  @Output('routeSelected') routeSelected = new EventEmitter();
  @Output('refreshRoutes') refreshRoutes = new EventEmitter();

  @Input('drawingEnabled') drawingEnabled = false;


  mapCenterCoordinates = MAP_CENTER_COORDINATES;
  markerIconUrl = MAP_MARKER_ICON_URL;
  mapStyles = mapStylesData;

  ferryMapLocations = [];
  selectedLocations = [];
  lines = [];
  linesArr = [];
  filteredLinesArr = [];
  drawnLines = [];

  drawingControlOptions: DrawingControlOptions = {drawingModes: [OverlayType.POLYLINE]};
  routesListPanelClosed = false;

  polylineOptions = MAP_POLYLINE_OPTIONS;
  strokesColor;
  selectedRoute;

  public pageSize = 5;
  public pageIndex = 0;

  mapZoom = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output('routesListReady') routesListReady = new EventEmitter();

  constructor(
    private ferriesService: FerriesService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private subject: SubjectService
  ) {
  }

  ngOnInit() {

    // Gets only locations (dots on map)
    this.getFerryMapLocations();

    // Gets routes between locations(lines between dots)
    if (this.drawingEnabled) {
      this.getAllRoutes();
    }

    this.strokesColor = this.drawingEnabled ? MAP_GREEN_COLOR : MAP_RED_COLOR;

    // Getting ferry locations data from the ferry order form
    this.subject.getMapData().subscribe((dt: any) => {
      if (dt.formToMap) {

        this.lines = [];
        this.selectedLocations = [];

        // Marking selected location on the map
        this.ferryMapLocations.map(sl => {

          // Retrieve current location object
          const location = dt?.selectedLocations?.find(d => d.name === sl.name);
          sl.markerIconUrl = 'assets/icons/' + (location ? 'red' : 'green') + '_circle_small.png';
        });
      }
    });

    // Getting ferry lines data between selected locations from the ferry order form
    this.subject.getMapLinesData().subscribe((dt: any) => {
      this.lines = [];
      if (dt) {
        // if (dt.geometry_type === 'LineString') {
        dt.map(d => {
          d.coordinates.map(c => {
            this.lines.push({name: d.name, lat: +c.lat, lng: +c.lng});
          });
        });
        // } else if (dt.geometry_type === 'Polygon') {
        //   Object.values(dt.coordinates[0]).reverse().map((c: any) => {
        //     if (c.lat) {
        //       this.lines.push({name: dt.name, lat: +c.lat, lng: +c.lng});
        //     }
        //
        //   });
        // }

        // console.log(this.lines)
        // console.log(this.linesArr)

      }
    });


  }

  // Gets routes (lines between dotes)
  getAllRoutes() {
    this.linesArr = [];
    this.ferriesService.getAllRoutesPrices().subscribe((data: any) => {

      // this.linesArr = data;
      if (data) {
        data.map(dt => {
          dt.strokeColor = MAP_GREEN_COLOR;
          this.linesArr.push(dt);
        });


        this.routesListReady.emit(data);
      }
      if (this.filteredLinesArr.length === 1) {
        --this.pageIndex;
        if (this.pageIndex < 0) {
          this.pageIndex = 0;
        }
      }

      this.filterRoutes();
      this.refreshRoutes.emit();
    });
  }

  // Handles floating panel routes pagination
  handle(e) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.filterRoutes();
  }

  // Filters routes for floating panel
  filterRoutes() {
    this.filteredLinesArr = this.linesArr.slice(this.pageIndex * this.pageSize,
      this.pageIndex * this.pageSize + this.pageSize);
  }

  mapReady(e) {

  }

  resetRoutes() {
    this.lines = [];
    this.selectedLocations = [];
    this.ferryMapLocations.map(sl => {
      sl.markerIconUrl = 'assets/icons/green_circle_small.png';
    });
    this.subject.setMapData({selectedLocations: [], currentLocation: {}});
  }

  mapClick(e) {

    if (this.drawingEnabled) {

      this.dialog.open(SaveLocationDialogComponent, {
        data: {
          latitude: e.coords.lat,
          longitude: e.coords.lng,
          edit: false
        }, width: '500px'
      }).afterClosed().subscribe((dt) => {
        this.getFerryMapLocations();
      });
    }
  }

  onMapReady(e) {
  }


  // Gets only locations on the map
  getFerryMapLocations() {
    this.ferryMapLocations = [];
    this.ferriesService.getLocations().subscribe((dt: any) => {
      dt.map(d => {
        d.markerIconUrl = this.markerIconUrl;
        d.latitude = +d.latitude;
        d.longitude = +d.longitude;
        this.ferryMapLocations.push(d);
      });
    });
  }

  selectLocationOnMap(location) {
    console.log('marker click')

    if (!this.drawingEnabled) {


      const selectedLocationsLen = this.selectedLocations.length;


      if (selectedLocationsLen < MAX_LOCATION_CHOICES) {
        const {markerIconUrl, ...l} = location;

        // Saving selected locations if not the same location point
        if (!this.selectedLocations.find(loc => loc === location)) {
          this.selectedLocations.push(l);
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
        this.subject.setMapData({
          selectedLocations: this.selectedLocations,
          currentLocation: l,
          formToMap: false
        });

      }
    } else {
      this.dialog.open(SaveLocationDialogComponent, {
        data: {
          ...location, ...{edit: true}
        }, width: '500px'
      }).afterClosed().subscribe(refresh => {
        this.getFerryMapLocations();
      });
    }
  }


  getRouteLines() {
console.log('get route lines')
    this.ferriesService.getRoutePrice(this.selectedLocations).subscribe((dt: any) => {
      this.linesArr = [];
      this.filteredLinesArr = [];
      this.lines = [];
      if (dt) {
        console.log(dt)
        dt?.[0].coordinates.map(c => {
          this.lines.push({name: dt.name, lat: +c.lat, lng: +c.lng, strokeColor: MAP_GREEN_COLOR});
        });
      }
      this.linesArr.push(this.lines);
      this.filteredLinesArr = this.linesArr;
      this.routeSelected.emit({selectedLocations: this.selectedLocations, routePriceData: dt});
    });
  }


  overlayComplete(e) {
    if (e.overlay) {

      const coordinatesArray = e.overlay.getPath().getArray();
      const coordinates = [];
      coordinatesArray.forEach((position) => {
        coordinates.push({lat: position.lat(), lng: position.lng()});
      });
      this.drawnLines.push(e.overlay);
      this.closeFullscreen();


      if (this.selectedRoute) {


        if (this.selectedRoute.coordinates.length !== 0) {

          this.dialog.open(ConfirmationDialogComponent, {
            data: {
              text1: 'This route already has coordinates on map',
              text2: 'Are you sure you want to edit its details anyway?',
              yes: 'Yes',
              no: 'No'
            }
          }).afterClosed().subscribe(result => {
            if (result) {

              console.log(this.selectedRoute)
              this.selectedRoute.coordinates = coordinates;
              this.openRouteDetailsDialog(coordinates);
            }
          });
        } else {
          this.selectedRoute.coordinates = coordinates;
          this.openRouteDetailsDialog(coordinates);
        }
      } else {
        this.openRouteDetailsDialog(coordinates);
      }

    }
  }

  openRouteDetailsDialog(coordinates) {
    this.dialog.open(SaveRouteDialogComponent, {
      data: {coordinates, map: true, route: this.selectedRoute},
      width: '700px',
      height: '500px'
    }).afterClosed().subscribe((dt) => {
      this.linesArr = dt;
      this.removeDrawn();
      this.getAllRoutes();
    });
  }

  /* Close fullscreen */
  closeFullscreen() {
    if (document.exitFullscreen && document.fullscreenElement !== null) {
      document.exitFullscreen();
    }
  }

  selectRoute(route) {

    if (route === this.selectedRoute) {
      this.selectedRoute = null;
    } else {
      this.selectedRoute = route;
      // console.log(route)
      // console.log(this.linesArr)
      // console.log(route)
      this.ferryMapLocations.map(location => {
        if ([route.start_point, route.end_point, route.stop_1, route.stop_2].includes(location.name)) {
          location.markerIconUrl = 'assets/icons/red_circle_small.png';
        } else {
          location.markerIconUrl = 'assets/icons/green_circle_small.png';
        }
      });
    }
  }


  removeRouteLine(route) {

    this.dialog.open(ConfirmationDialogComponent, {}).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        const foundRoute = this.linesArr.find(l => l.name === route.name);

        if (foundRoute) {
          route.coordinates = [];
          this.ferriesService.saveRoutePrice(route).subscribe((dt: any) => {
            this.linesArr = dt;
            this.getAllRoutes();
            this.removeDrawn();
            this.toastr.success('Route line removed successfully!');
          });
        }
      }

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
      location.markerIconUrl = MAP_MARKER_ICON_URL;
    });
  }

  get selectedRouteValid() {
    return this.selectedLocations.length > 1;
  }


}
