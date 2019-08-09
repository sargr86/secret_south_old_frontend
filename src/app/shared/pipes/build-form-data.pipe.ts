import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'buildFormData'
})
export class BuildFormDataPipe implements PipeTransform {

    transform(data: any, files?: any): any {
        const fd: FormData = new FormData();

        for (const field of Object.keys(data)) {
            if (field !== 'img') {
                fd.append(field, data[field]);
            } else {
                // fd.append('img', files ? file.name : '');
            }
        }

        // If files are selected
        if (files && files.length > 1) {
            console.log(files)
            files.map(file => {
                fd.append('upload_images', file);
                fd.append('img', file ? file.name : '');
            });
        } else {
            fd.append('upload_image', files);
            fd.append('img', files ? files.name : '');
        }

        return fd;
    }

}
