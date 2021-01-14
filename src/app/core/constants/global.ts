import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {environment} from '@env';
import {Section} from '@shared/models/Section';
// import {NgxMaterialTimepickerTheme} from 'ngx-material-timepicker';
import {NgxGalleryOptions} from 'ngx-gallery-9';
import {OwlOptions} from 'ngx-owl-carousel-o';
import moment from 'moment';
import {Validators} from '@angular/forms';

export const API_URL = environment.apiUrl;


// Folders
export const UPLOADS_FOLDER = API_URL + 'uploads/';
export const TOURS_FOLDER = UPLOADS_FOLDER + 'others/tours/';
export const ACTIVITIES_FOLDER = UPLOADS_FOLDER + 'others/activities/';
export const USERS_FOLDER = UPLOADS_FOLDER + 'users/';
export const ACCOMMODATIONS_FOLDER = UPLOADS_FOLDER + 'others/accommodations/';
export const FOOD_DRINK_FOLDER = UPLOADS_FOLDER + 'others/food-drink/';
export const FERRIES_FOLDER = UPLOADS_FOLDER + 'others/ferries/';

export const SPINNER_DIAMETER = 30;

// Tables columns
export const FERRIES_TABLE_COLUMNS = ['name', 'max_people', 'min_people', 'company', 'actions'];
export const FOOD_DRINK_TABLE_COLUMNS = ['name', 'address', 'company', 'actions'];
export const ACCOMMODATIONS_TABLE_COLUMNS = ['name', 'address', 'company', 'actions'];
export const ACTIVITIES_TABLE_COLUMNS = ['name', 'address', 'company', 'actions'];
export const TOURS_TABLE_COLUMNS = ['tours_type', 'name', 'company', 'price', 'actions'];
export const PARTNERS_TABLE_COLUMNS = ['first_name', 'last_name', 'email', 'partner_type', 'actions'];
export const EMPLOYEES_TABLE_COLUMNS = ['first_name', 'last_name', 'email', 'partner_type', 'company', 'actions'];
export const CUSTOMERS_TABLE_COLUMNS = ['first_name', 'last_name', 'email'];
export const MAT_TABLE_PAGINATION_VALUES = [5, 10, 25, 100];
export const CONFIRM_DIALOG_SETTINGS = {autoFocus: true, width: '300px'};
export const BOOKING_DIALOG_SETTINGS = {autoFocus: true, width: '500px'};


// Google API key
export const GOOGLE_API_KEY = 'AIzaSyDGnTNMKk7nklAM7Z3dWTV5_JV_auarQVs';

// Stripe public key
export const STRIPE_PUBLIC_KEY = 'pk_test_MyqMApfCZgjMQywNsw85PsVl00Ys4ByBYE';
// export const STRIPE_PUBLIC_KEY = 'pk_live_79SLhLfYlUvFHoHHUxkmrMhV00WIYqhoXo';

export const STRIPE_CARD_OPTIONS = {
  style: {
    base: {
      iconColor: '#666EE8',
      color: '#31325F',
      // lineHeight: '40px',
      fontWeight: 300,
      fontFamily: 'Helvetica Neue, Helvetica, sans-serif',
      fontSize: '18px',
      '::placeholder': {
        color: '#CFD7E0'
      }
    }
  }
};

export const USER_TYPES = [
  {label: 'partners', role: 'partner'},
  {label: 'employees', role: 'employee'},
  {label: 'customers', role: 'customer'},
  {label: 'drivers', role: 'driver'}
];


// Menu icons
export const MENU_ITEM_ICONS = [
  {item: 'dashboard', icon: 'fa-user'},
  {item: 'ferries', icon: 'fa-anchor'},
  {item: 'tours', icon: 'fa-directions'},
  {item: 'tour types', icon: 'fa-street-view'},
  {item: 'food', icon: 'fa-utensils'},
  {item: 'activities', icon: 'fa-swimmer'},
  {item: 'accommodations', icon: 'fa-bed'},
  {item: 'companies', icon: 'fa-briefcase'},
  {item: 'partners', icon: 'fa-users'},
  {item: 'employees', icon: 'fa-users'},
  {item: 'customers', icon: 'fa-users'},
  {item: 'jobs', icon: 'fa-suitcase'}
];

// Partner links
export const DASHBOARD_LINKS = [
  {
    name: 'Dashboard',
    children: [
      {name: 'Edit'},
      {name: 'Show'},
    ]
  },
  {
    name: 'Activities',
    children: [
      {name: 'Add'},
      {name: 'Show'},
      {name: 'Add types'},
      {name: 'Show types'}
    ]
  },
  {
    name: 'Accommodations',
    children: [
      {name: 'Add'},
      {name: 'Show'},
      {name: 'Orders'}
    ]
  },
  {
    name: 'Ferries',
    children: [
      {name: 'Add'},
      {name: 'Manage routes prices'},
      {name: 'Table Routes'},
      {name: 'Map Routes'},
      {name: 'Show'},
      {name: 'Orders'}
    ]
  },
  {
    name: 'Food/Drink',
    children: [
      {name: 'Add'},
      {name: 'Show'},
      {name: 'Orders'}
    ]
  },
  {
    name: 'Tours',
    children: [
      {name: 'Add'},
      {name: 'Show'},
      {name: 'Add types'},
      {name: 'Show types'},
      {name: 'Daily'},
      {name: 'Orders'}
    ]
  },
  {
    name: 'Companies',
    children: [
      {name: 'Add'},
      {name: 'Show'},
    ]
  },
  // {
  //   name: 'Contacts',
  //   children: [
  //     {name: 'Requests'},
  //     {name: 'Invitations'}
  //   ]
  // },
  // {
  //   name: 'Partners',
  //   children: [
  //     {name: 'Invite'},
  //     {name: 'Show'},
  //     // {name: 'Add types'},
  //     // {name: 'Show types'}
  //   ]
  // },
  {
    name: 'Employees',
    children: [
      {name: 'Add'},
      {name: 'Show'}
      // {name: 'Add types'},
      // {name: 'Show types'}
    ]
  },
  // {
  //   name: 'Customers',
  //   children: [
  //     {name: 'Show'}
  //   ]
  // },
  // {
  //   name: 'Jobs',
  //   children: [
  //     {name: 'Show'}
  //   ]
  // }
];

// Drop zone config
export const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: '{no_url}',
  maxFilesize: 50,
  maxFiles: 1,
  acceptedFiles: 'image/*',
  autoProcessQueue: false,
  addRemoveLinks: true
};

export const FERRY_ROUTES_FILE_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: '{no_url}',
  maxFilesize: 50,
  maxFiles: 1,
  acceptedFiles: 'application/json',
  autoProcessQueue: false,
  addRemoveLinks: true
};

export const FERRY_PRICES_FILE_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: '{no_url}',
  maxFilesize: 50,
  maxFiles: 1,
  acceptedFiles: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  autoProcessQueue: false,
  addRemoveLinks: true
};

export const TOURS_DROPZONE_CONFIG = {
  maxFiles: 10
};

export const PREVIOUS_DATES_FILTER = (d: Date | null): boolean => {
  return moment(d).isSameOrAfter(moment(), 'day');
}


// ngx-phone-number countries
export const ALLOWED_COUNTRIES = ['ie', 'in', 'ca', 'us', 'am', 'gb'];
export const DEFAULT_COUNTRY = 'ie';


export const MAIN_SECTIONS: Section[] = [
  {name: 'Water taxi', icon: 'directions_boat', link: 'ferries'},
  {name: 'Tours', icon: 'beach_access', link: 'tours'},
  {name: 'Activities', icon: 'directions_run', link: 'activities'},
  {name: 'Accommodations', icon: 'local_hotel', link: 'accommodations'},
  {name: 'Food/Drink', icon: 'restaurant_menu', link: 'food-drink'},
  // {name: 'Map'}
];


export const TIMEPICKER_THEME = {
  container: {
    bodyBackgroundColor: '#424242',
    buttonColor: '#fff'
  },
  dial: {
    dialBackgroundColor: '#555',
  },
  clockFace: {
    clockFaceBackgroundColor: '#555',
    clockHandColor: '#164547',
    clockFaceTimeInactiveColor: '#fff'
  }
};

export const USER_ROLES = [
  {name: 'admin', url: '/admin'},
  {name: 'partner', url: '/partners'},
  {name: 'employee', url: '/employees'},
  {name: 'customer', url: '/customers'},
];


export const EDIT_FORM_GALLERY_OPTIONS: NgxGalleryOptions[] = [
  {
    'image': false, 'height': '100px',
    'previewFullscreen': true,
    'width': '50%',
    'previewKeyboardNavigation': true,
    'imageDescription': true,
    'previewCloseOnEsc': true,

    'thumbnailActions': [
      // {
      //     icon: 'fa fa-times-circle', onClick: this.removeImage.bind(this), titleText: 'delete'
      // },
      // {
      //     icon: 'fa fa-star', onClick: this.makeCover.bind(this), titleText: 'cover'
      // }
    ]
  },
  {'breakpoint': 500, 'width': '300px', 'height': '300px', 'thumbnailsColumns': 3},
  // {'breakpoint': 300, 'width': '100%', 'height': '200px', 'thumbnailsColumns': 2},
];

export const SINGLE_PAGE_GALLERY_OPTIONS = [
  {
    'image': false, 'height': '100px',
    'previewFullscreen': true,
    'width': '50%',
    'previewKeyboardNavigation': true,
    'imageDescription': true,
    'previewCloseOnEsc': true,
  },
  {},
  // {'breakpoint': 500, 'width': '300px', 'height': '300px', 'thumbnailsColumns': 3},
  {'thumbnails': false, 'imageBullets': true},  //'imageArrows': false
  {'breakpoint': 300, 'width': '100%', 'height': '200px', 'thumbnailsColumns': 2}
];

export const SINGLE_PAGE_CAROUSEL_OPTIONS: OwlOptions = {
  loop: true,
  mouseDrag: false,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 700,
  nav: false,
  navText: ['<i class=\'fa fa-chevron-left\'></i>', '<i class=\'fa fa-chevron-right\'></i>'],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 1
    },
    768: {
      items: 1
    },
    1000: {
      items: 3
    }
  },
};


export const ALL_ORDER_TABS = [
  {name: 'Pending', count: 0},
  {name: 'Assigned', count: 0},
  {name: 'Ongoing', count: 0},
  {name: 'Arrived', count: 0},
  {name: 'Started', count: 0},
  {name: 'Cancelled', count: 0},
  {name: 'Finished', count: 0},
  {name: 'All', count: 0}
];

export const FOOTER_LINKS = [
  [
    {name: 'Accommodation'},
    {name: 'Flights'},
    {name: 'Cars'},
    {name: 'Cruises'},
    {name: 'Gallery'},
    {name: 'About us'}
  ],
  [
    {name: 'Countries'},
    {name: 'Regions'},
    {name: 'Cities'},
    {name: 'Hotels'},
    {name: 'Gallery'},
    {name: 'Airports'}
  ],
  [
    {name: 'About'},
    {name: 'Careers'},
    {name: 'Privacy Policy'},
    {name: 'Terms of Service'},
  ]
];

export const DRIVER_ORDER_TABS = ALL_ORDER_TABS.filter(t => t.name !== 'Pending');

export const ORDERS_TABLE_COLUMNS = ['full_name', 'guests', 'date', 'time', 'email', 'phone', 'actions'];
export const ROUTES_PRICES_TABLE_COLUMNS = ['start_point', 'stop_1', 'stop_2', 'end_point', 'has_coordinates_on_map', 'has_price', 'single', 'return', 'total', 'actions'];


export const MIN_PEOPLE_ON_FERRY = 6;
export const DEFAULT_ADULTS_COUNT = 2;
export const DEFAULT_CHILDREN_COUNT = 2;


export const RESTAURANT_BOOKING_HOURS = ['6:30', '7:00', '7:30', '8:00'];

export const DEFAULT_TOUR_MAX_PARTICIPANTS_COUNT = 10;
export const MAX_LOCATION_CHOICES = 4;

export const LOCATION_CONTROLS = [
  {id: 'start-point', title: 'Start point'},
  {id: 'end-point', title: 'End point'},
  {id: 'stop-1', title: 'Stop 1'},
  {id: 'stop-2', title: 'Stop 2'}
];


