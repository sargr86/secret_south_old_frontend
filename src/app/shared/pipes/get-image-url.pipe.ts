import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {UPLOADS_FOLDER} from '../constants/settings';

@Pipe({
    name: 'getImageUrl'
})
export class GetImageUrlPipe implements PipeTransform {

    constructor(
        private sanitizer: DomSanitizer,
    ) {

    }

    transform(name, path = '', background = false): any {
        let folder = '';
        if (path) {
            folder = path;
        }
        if (!name || !path) {
            return;
        }
        if (background) {
            let url = 'url("' + UPLOADS_FOLDER + folder + '/' + name + '")';
            return this.sanitizer.bypassSecurityTrustStyle(url);
        } else {
            const url = UPLOADS_FOLDER + folder + '/' + name;
            return this.sanitizer.bypassSecurityTrustUrl(url);
        }
    }

}
