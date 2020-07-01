import {Injectable} from '@angular/core';
import {API_URL} from '../constants/global';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

// JWT helper
import {JwtHelperService} from '@auth0/angular-jwt';
import * as jwtDecode from 'jwt-decode';
import {User} from '@shared/models/User';
import {WebSocketService} from '@core/services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData;

  constructor(
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    // private socket: Socket,
    private websocketService: WebSocketService
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
  login(formData) {
    return this.httpClient.post<User>(`${API_URL}auth/login`, formData);
  }


  /**
   * Checks current user roles
   * @param role passed role
   * @param userData passed user data
   */
  checkRoles(role: string, userData = null) {

    if (userData) {
      this.userData = userData;
    }
    if (this.loggedIn() && this.userData) {
      if ('role' in this.userData) {
        return this.userData.role['name_en'].toLowerCase() === role;
      } else {

        return this.userData.roles.map(r => {
          return (r['name_en'].toLowerCase().replace(' ', '_') === role);
        }).some(Boolean);
      }
    }
    return false;
  }

  /**
   * Logs out the current user
   */
  logout() {
    localStorage.removeItem('token');
    // this.socket.disconnect();
    // this.socket.emit()
    this.websocketService.emit('logout' );
    this.router.navigate(['/']);
  }

  /**
   * Saves user show-profile details
   * @param params user profile info
   */
  update(params) {
    return this.httpClient.put<User>(`${API_URL}auth/update-profile`, params);
  }

  /**
   * Gets user profile info
   * @param params params user profile info
   */
  getUser(params) {
    return this.httpClient.get<User>(`${API_URL}auth/get-profile`, {params: params});
  }
}
