import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {ActivityTypesService} from '@core/services/activity-types.service';

@Injectable({
  providedIn: 'root'
})
export class ActivitySubtypeResolverService {

  constructor(
  private activitiesTypes: ActivityTypesService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.activitiesTypes.getSubtypes({id: route.params.id});
  }
}
