import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {FerriesService} from '../services/ferries.service';
import {PartnerService} from '../services/partner.service';

@Injectable({
  providedIn: 'root'
})
export class PartnerTypeResolverService implements Resolve<any> {

  constructor(
      private _ferries: FerriesService,
      private _partners: PartnerService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this._partners.getTypes();
  }
}
