import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'buildFormData'
})
export class BuildFormDataPipe implements PipeTransform {

    transform(data: any, files?: any, fileKey = 'upload_images'): any {
        const fd: FormData = new FormData();

        for (const field of Object.keys(data)) {
            if (field !== 'img') {
                fd.append(field, data[field] ? data[field] : '');
            } else {
                // fd.append('img', files ? file.name : '');
            }
        }


        // If files are selected
        if (files) {
            // Multiple files case
            // if (files.length > 1) {
                files.map(file => {
                    fd.append(fileKey, file);
                    // fd.append('img', file ? file.name : '');
                });

                // One file case
            // } else {
            //     console.log(files)
            //     fd.append('upload_images', files[0]);
            //     // fd.append('img', files.length !== 0 ? files[0].name : '');
            // }
        }


        return fd;
    }

}
