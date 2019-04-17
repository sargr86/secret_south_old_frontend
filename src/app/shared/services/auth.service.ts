import {Injectable} from '@angular/core';
import {API_URL} from '../constants/settings';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

// JWT helper
import {JwtHelperService} from '@auth0/angular-jwt';
import * as jwtDecode from 'jwt-decode';
import {User} from '../models/User';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    userData;

    constructor(
        private httpClient: HttpClient,
        private jwtHelper: JwtHelperService,
        private router: Router
    ) {
        // Receiving user data from here!!!!
        if (this.loggedIn()) {
            const token = localStorage.getItem('token');
            this.userData = jwtDecode(token);
        }
    }


    /**
     * Sends data for user registration
     * @param params user parameters
     */
    register(params) {
        return this.httpClient.post(`${API_URL}auth/register`, params);
    }

    /**
     * Checks to see if user logged in/ token expired
     */
    loggedIn() {
        return !this.jwtHelper.isTokenExpired();
    }

    /**
     * Sends login credentials
     * @param formData formData object
     */
    login(formData, user) {
        return this.httpClient.post<User>(`${API_URL}${user}/login`, formData);
    }


    /**
     * Checks current user roles
     * @param role passed role
     */
    checkRoles(role: string) {
        if (this.loggedIn() && this.userData) {
            return this.userData.roles.map(r => {
                return (r['name_en'].toLowerCase().replace(' ', '_') === role);
            }).some(Boolean);
        }
        return false;
    }

    /**
     * Logs out the current user
     */
    logout() {
        localStorage.setItem('token', '');
        this.router.navigate(['login']);
    }

    /**
     * Saves user profile details
     * @param params
     * @returns
     */
    update(params) {
        return this.httpClient.put<User>(`${API_URL}auth/update-profile`, params);
    }
}