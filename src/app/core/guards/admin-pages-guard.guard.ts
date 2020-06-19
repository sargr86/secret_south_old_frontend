import {Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  NavigationEnd, Data
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '@core/services/auth.service';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminPagesGuardGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (state.url.includes('admin')) {
      this.router.navigate([`${state.url}/show`]).then(a => a);
      return false;
    }
    return true;
  }

}
