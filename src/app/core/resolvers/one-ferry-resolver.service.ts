import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
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
    const id = +route.params.id;
    if (id) {
      console.log(id)
      return this._ferries.getOneFerry({id});
    }
    return false;

  }
}
