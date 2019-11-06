import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {ActivitiesService} from '../services/activities.service';

@Injectable({
    providedIn: 'root'
})
export class ActivityResolverService {

    constructor(
        private _activities: ActivitiesService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        return this._activities.getOne({id: route.params.id});
    }
}
