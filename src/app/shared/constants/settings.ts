import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {environment} from '../../../environments/environment';
import {Section} from '../models/Section';
import {NgxMaterialTimepickerTheme} from 'ngx-material-timepicker';

export const LIVE_URL = 'http://myworks.site/dev/secret_south';
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
export const TOURS_TABLE_COLUMNS = ['name', 'address', 'company', 'tours_type', 'actions'];
export const PARTNERS_TABLE_COLUMNS = ['first_name', 'last_name', 'email', 'partner_type', 'actions'];
export const EMPLOYEES_TABLE_COLUMNS = ['first_name', 'last_name', 'email', 'partner_type', 'company', 'actions'];
export const CUSTOMERS_TABLE_COLUMNS = ['first_name', 'last_name', 'email'];
export const MAT_TABLE_PAGINATION_VALUES = [5, 10, 25, 100];
export const CONFIRM_DIALOG_SETTINGS = {autoFocus: true, width: '300px'};
export const BOOKING_DIALOG_SETTINGS = {autoFocus: true, width: '500px'};


// GOOGLE API KEY
export const GOOGLE_API_KEY = 'AIzaSyDGnTNMKk7nklAM7Z3dWTV5_JV_auarQVs';

export const USER_TYPES = [
    {label: 'partners', role: 'partner'},
    {label: 'employees', role: 'employee'},
    {label: 'customers', role: 'customer'}
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
        ]
    },
    {
        name: 'Ferries',
        children: [
            {name: 'Add'},
            {name: 'Show'},
        ]
    },
    {
        name: 'Food/Drink',
        children: [
            {name: 'Add'},
            {name: 'Show'},
        ]
    },
    {
        name: 'Tours',
        children: [
            {name: 'Add'},
            {name: 'Show'},
            {name: 'Add types'},
            {name: 'Show types'}
        ]
    },
    {
        name: 'Companies',
        children: [
            {name: 'Add'},
            {name: 'Show'},
        ]
    },
    {
        name: 'Partners',
        children: [
            {name: 'Add'},
            {name: 'Show'},
            // {name: 'Add types'},
            // {name: 'Show types'}
        ]
    },
    {
        name: 'Employees',
        children: [
            {name: 'Add'},
            {name: 'Show'}
            // {name: 'Add types'},
            // {name: 'Show types'}
        ]
    },
    {
        name: 'Customers',
        children: [
            {name: 'Show'}
        ]
    },
    {
        name: 'Jobs',
        children: [
            {name: 'Show'}
        ]
    }
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

// ngx-phone-number countries
export const ALLOWED_COUNTRIES = ['ie', 'in', 'ca', 'us', 'am', 'gb'];
export const DEFAULT_COUNTRY = 'ie';


export const MAIN_SECTIONS: Section[] = [
    {name: 'Accommodations', icon: 'local_hotel', link: 'accommodations'},
    {name: 'Food/Drink', icon: 'restaurant_menu', link: 'food-drink'},
    {name: 'Ferries', icon: 'directions_boat', link: 'ferries'},
    {name: 'Tours', icon: 'beach_access', link: 'tours'},
    {name: 'Activities', icon: 'directions_run', link: 'activities'},
    // {name: 'Map'}
];


export const TIMEPICKER_THEME: NgxMaterialTimepickerTheme = {
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
