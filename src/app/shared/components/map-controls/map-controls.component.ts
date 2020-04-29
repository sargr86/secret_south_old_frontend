import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MAP_CENTER_COORDINATES, MAX_LOCATION_CHOICES} from '@core/constants/settings';
import * as mapStylesData from '@app/maps/map_styles2.json';
import {FerriesService} from '@core/services/ferries.service';

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
  ferryMapLocations = [];
  selectedLocations = [];
  lines = [];
  markerIconUrl = 'assets/icons/green_circle_small.png';

  polylineOptions = {
    strokeColor: '#8B0000',
    strokeWeight: 4,
    strokeOpacity: 1,
    // icons: [{
    //   icon: this.lineSymbol,
    //   offset: '0',
    //   repeat: '20px',
    //   path: 'M 0,-1 0,1'
    // }, {
    //   icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW},
    //   offset: '100%'
    // }],
    geodesic: true,
  };

  paths = [
    {
      'lat': 51.804713,
      'lng': -8.298334
    },
    {
      'lat': 51.8442234,
      'lng': -8.2284701
    },
    {
      'lat': 51.845922,
      'lng': -8.209558
    },
    {
      'lat': 51.848841,
      'lng': -8.297425
    },
    {
      'lat': 51.841616,
      'lng': -8.2918512
    },
    {
      'lat': 51.836737,
      'lng': -8.2937395
    },
    {
      'lat': 51.8102374,
      'lng': -8.2910498
    },
    {
      'lat': 51.804713,
      'lng': -8.298334
    },
  ];

  constructor(
    private ferriesService: FerriesService
  ) {
  }

  ngOnInit() {
    this.getFerryMapLocations();
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

    const selectedLocationsLen = this.selectedLocations.length;
    if (selectedLocationsLen < MAX_LOCATION_CHOICES) {

      // Saving selected locations
      this.selectedLocations.push(location);

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

  get selectedRouteValid() {
    return this.selectedLocations.length > 1;
  }

  getRouteLines() {

    this.ferriesService.getRoutePrice(this.selectedLocations).subscribe((dt: any) => {
      this.lines = [];
      if (dt) {
        if (dt.geometry_type === 'LineString') {
          dt.coordinates.map(c => {
            this.lines.push({name: dt.name, lat: +c.lat, lng: +c.lng});
          });
        } else if (dt.geometry_type === 'Polygon') {
          Object.values(dt.coordinates[0]).reverse().map((c: any) => {
            if (c.lat) {
              this.lines.push({name: dt.name, lat: +c.lat, lng: +c.lng});
            }

          });
        }

      }
      this.routeSelected.emit({selectedLocations: this.selectedLocations, routePriceData: dt});
    });
  }

}
