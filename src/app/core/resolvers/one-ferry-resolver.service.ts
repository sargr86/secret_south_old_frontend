import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {FerriesService} from '../services/ferries.service';

@Injectable({
    providedIn: 'root'
})
export class OneFerryResolverService implements Resolve<any> {

    constructor(
        private _ferries: FerriesService,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        return this._ferries.getOneFerry({id: route.params.id});
    }
}
