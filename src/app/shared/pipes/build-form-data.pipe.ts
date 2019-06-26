import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'buildFormData'
})
export class BuildFormDataPipe implements PipeTransform {

    transform(data: any, file?: any): any {
        const fd: FormData = new FormData();

        for (const field of Object.keys(data)) {
            if (field !== 'img') {
                fd.append(field, data[field]);
            } else {
                fd.append('img', file ? file.name : '');
            }
        }

        // If file is selected
        if (file) {

            fd.append('upload_image', file);
        }

        return fd;
    }

}
