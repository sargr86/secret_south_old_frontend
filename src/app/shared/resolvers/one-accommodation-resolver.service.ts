import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {AccommodationsService} from '../services/accommodations.service';

@Injectable({
    providedIn: 'root'
})
export class OneAccommodationResolverService implements Resolve<any> {

    constructor(
        private _accommodation: AccommodationsService
    ) {

    }

    resolve(route: ActivatedRouteSnapshot) {
        return this._accommodation.getOne({id: route.params.id});
    }
}
