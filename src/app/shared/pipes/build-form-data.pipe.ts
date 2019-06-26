import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'buildFormData'
})
export class BuildFormDataPipe implements PipeTransform {

    transform(data: any, file?: any): any {
        const fd: FormData = new FormData();

        for (const field of Object.keys(data)) {
            fd.append(field, data[field]);
        }

        console.log(file)

        // If file is selected
        if (file) {
            fd.append('img', file.name);
            fd.append('upload_image', file);
        }

        return fd;
    }

}
