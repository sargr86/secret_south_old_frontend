import {Injectable} from '@angular/core';
import {ActivityTypesService} from '@core/services/activity-types.service';
import {ActivatedRouteSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OneActivitySubtypeResolverService {

  constructor(
    private activitiesTypes: ActivityTypesService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.activitiesTypes.getOneSubtype({id: route.params.sub_id});
  }


}
