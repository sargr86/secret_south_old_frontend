import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserResolverService implements Resolve<any> {

    constructor(
        private _auth: AuthService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        return this._auth.getUser({email: this._auth.userData.email});
    }
}

