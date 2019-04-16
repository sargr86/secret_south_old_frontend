import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {FerryService} from '../../admin/services/ferry.service';

@Injectable({
    providedIn: 'root'
})
export class OneFerryResolverService implements Resolve<any> {

    constructor(
        private _ferries: FerryService,
        private route: ActivatedRoute
    ) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        return this._ferries.getOneFerry({id: route.params.id});
    }
}
