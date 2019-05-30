import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {environment} from '../../../environments/environment';

export const LIVE_URL = 'http://myworks.site/dev/secret_south';
export const API_URL = environment.apiUrl;
export const UPLOADS_FOLDER = API_URL + 'uploads/';
export const TOURS_FOLDER = UPLOADS_FOLDER + 'others/tours/';
export const ACTIVITIES_FOLDER = UPLOADS_FOLDER + 'others/activities/';
export const USERS_FOLDER = UPLOADS_FOLDER + 'users/';

export const SPINNER_DIAMETER = 30;

// Tables columns
export const FERRIES_TABLE_COLUMNS = ['name', 'max_people', 'min_people', 'address', 'actions'];
export const FOOD_DRINK_TABLE_COLUMNS = ['name', 'address', 'actions'];
export const ACCOMMODATIONS_TABLE_COLUMNS = ['name', 'address', 'actions'];
export const ACTIVITIES_TABLE_COLUMNS = ['name', 'address', 'actions'];
export const PARTNERS_TABLE_COLUMNS = ['first_name', 'last_name', 'email', 'partner_type', 'actions'];
export const EMPLOYEES_TABLE_COLUMNS = ['first_name', 'last_name', 'email', 'partner_type', 'actions'];
export const TOURS_TABLE_COLUMNS = ['name', 'address', 'tours_type', 'actions'];
export const MAT_TABLE_PAGINATION_VALUES = [5, 10, 25, 100];
export const CONFIRM_DIALOG_SETTINGS = {autoFocus: true, width: '300px'};


// GOOGLE API KEY
export const GOOGLE_API_KEY = 'AIzaSyDGnTNMKk7nklAM7Z3dWTV5_JV_auarQVs';

export const USER_TYPES = [
    {label: 'partners', role: 'partner'}, {label: 'employees', role: 'employee'}];


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


export const MAIN_SECTIONS = [
    {name: 'Ferries', icon: 'directions_boat'},
    {name: 'Tours', icon: 'beach_access'},
    {name: 'Food/Drink', icon: 'restaurant_menu'},
    {name: 'Accommodations', icon: 'local_hotel'},
    {name: 'Activities', icon: 'directions_run'}
];
