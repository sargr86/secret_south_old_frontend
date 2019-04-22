import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {environment} from '../../../environments/environment';

export const LIVE_URL = 'http://myworks.site/dev/secret_south';
export const API_URL = environment.apiUrl;
export const TOURS_FOLDER = API_URL + 'uploads/others/tours/';

export const SPINNER_DIAMETER = 30;

// Tables columns
export const FERRIES_TABLE_COLUMNS = ['name', 'email', 'max_people', 'min_people', 'phone', 'address', 'actions'];
export const FOOD_DRINK_TABLE_COLUMNS = ['name', 'address', 'actions'];
export const PARTNERS_TABLE_COLUMNS = ['first_name', 'last_name', 'email', 'partner_type', 'actions'];
export const TOURS_TABLE_COLUMNS = ['name', 'address', 'tours_type', 'actions'];
export const MAT_TABLE_PAGINATION_VALUES = [5, 10, 25, 100];
export const CONFIRM_DIALOG_SETTINGS = {autoFocus: true, width: '300px'};


// Menu icons
export const MENU_ITEM_ICONS = [
    {item: 'dashboard', icon: 'fa-user'},
    {item: 'ferries', icon: 'fa-anchor'},
    {item: 'tours', icon: 'fa-directions'},
    {item: 'tour types', icon: 'fa-street-view'},
    {item: 'food', icon: 'fa-utensils'},
    {item: 'partners', icon: 'fa-users'}
];


// Drop zone config
export const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
    // Change this to your upload POST address:
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