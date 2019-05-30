import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CompaniesService} from '../services/companies.service';

@Injectable({
    providedIn: 'root'
})
export class CompanyResolverService implements Resolve<any> {

    constructor(
        private _companies: CompaniesService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this._companies.getOne({id: route.params.id});
    }


}
