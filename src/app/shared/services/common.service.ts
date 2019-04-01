import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    formProcessing = false;
    dataLoading = false;

    constructor() {
    }
}
