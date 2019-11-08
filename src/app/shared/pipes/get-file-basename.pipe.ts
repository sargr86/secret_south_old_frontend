import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'baseName'
})
export class GetFileBasenamePipe implements PipeTransform {

    transform(str: string, args?: any): any {
        return str.substring(str.lastIndexOf('/') + 1);
    }

}
