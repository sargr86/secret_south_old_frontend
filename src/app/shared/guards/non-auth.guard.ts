import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
/**
 * Restricts user to go to login/register when authorized
 */
export class NonAuthGuard implements CanActivate {

    constructor(
        public auth: AuthService,
        public router: Router) {

    }

    canActivate(
        next: ActivatedRouteSnapshot
    ) {
        if (this.auth.loggedIn()) {

            this.router.navigate([this.auth.checkRoles('admin') ? 'admin/dashboard/show' : '/']);
            return false;
        } else {
            return true;
        }
    }
}
