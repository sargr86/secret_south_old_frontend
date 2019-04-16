import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {ToursService} from '../../admin/services/tours.service';

@Injectable({
  providedIn: 'root'
})
export class OneTourResolverService {

  constructor(
      private _tours: ToursService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this._tours.getOneTour({id: route.params.id});
  }
}

