import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    formProcessing = false;
    dataLoading = false;
    showOverlay = false;
    showPrice = false;

    constructor(
        private router: Router
    ) {
        // this.showOverlay = this.router.url === '/';
    }
}
