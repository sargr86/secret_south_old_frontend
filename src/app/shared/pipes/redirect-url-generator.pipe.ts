import {Pipe, PipeTransform} from '@angular/core';
import {AuthService} from '@core/services/auth.service';

@Pipe({
    name: 'redirectUrlGenerator'
})
export class RedirectUrlGeneratorPipe implements PipeTransform {
    constructor(private auth: AuthService) {
    }

    transform(item: any, args?: any): any {
        return `${this.auth.checkRoles('admin') ? 'admin' : 'partners'}/${item}/show`;
    }

}
