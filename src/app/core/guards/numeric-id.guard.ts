import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ParamMap} from '@angular/router';
import {Observable} from 'rxjs';
import {GetAuthUserPipe} from '@shared/pipes/get-auth-user.pipe';
import {AuthService} from '@core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NumericIdGuard implements CanActivate {
  authUser;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {


  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const paramMap: ParamMap = route.paramMap;
    const id = +paramMap.get('id');

    if (id) {
      return true;
    }
    this.router.navigate([this.auth.checkRoles('admin') ? 'admin' : 'ferries']).then(a => a);
    return false;

  }

}
