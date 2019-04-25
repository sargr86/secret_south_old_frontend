import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class OneActivityResolverService implements Resolve<any> {

    constructor() {
    }

    resolve(route: ActivatedRouteSnapshot) {
        // return this._accommodation.getOne({id: route.params.id});
    }

}
