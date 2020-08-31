import {PolylineOptions} from '@agm/core';

export const MAP_CENTER_COORDINATES = {lat: 51.797999, lng: -8.294371};
export const MAP_MARKER_ICON_URL = 'assets/icons/green_circle_small.png';
export const DEFAULT_LOCATIONS_CHOICES = 2;
export const MAX_LOCATION_CHOICES = 4;

export const MAP_LINE_SYMBOL = {
  path: 'M 0,-1 0,1', strokeWeight: 1.5, scale: 2, strokeOpacity: 100
};

export const MAP_ARROW_SYMBOL = {
  path: 'M 0,0 1,4 -1,4 0,0 z', strokeOpacity: 1, strokeWeight: 1, fillOpacity: 100
};

export const MAP_GREEN_COLOR = '#80b446';
export const MAP_RED_COLOR = '#8B0000';

export const MAP_POLYLINE_OPTIONS: PolylineOptions = {
  strokeColor: MAP_RED_COLOR,
  editable: true,
  draggable: true,
  strokeOpacity: 2,
  icons: [{
    icon: MAP_LINE_SYMBOL,
    offset: '0',
    repeat: '10px',

  }, {
    icon: MAP_ARROW_SYMBOL,
    offset: '100%',
    repeat: '100px',
  }],
};


