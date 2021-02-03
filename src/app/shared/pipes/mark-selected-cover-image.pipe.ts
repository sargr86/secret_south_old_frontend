import {ElementRef, Pipe, PipeTransform} from '@angular/core';
import {GetFileBasenamePipe} from '@shared/pipes/get-file-basename.pipe';

@Pipe({
  name: 'markSelectedCoverImage'
})
export class MarkSelectedCoverImagePipe implements PipeTransform {

  constructor(
    private basename: GetFileBasenamePipe,
  ) {

  }

  transform(imgPath: any, elRef?: any): any {
    const thumbs = elRef.nativeElement.getElementsByClassName('ngx-gallery-thumbnail');
    if (elRef && imgPath) {

      // Getting selected cover image star
      for (let i = 0; i < thumbs.length; i++) {
        const url = thumbs[i].style.backgroundImage;
        const realUrl = this.basename.transform(url.slice(4, -1).replace(/"/g, ''));
        if (this.basename.transform(imgPath) === decodeURIComponent(realUrl)) {
          const star = thumbs[i].querySelector('.ngx-gallery-icon-content');
          star.classList.add('selected');
        }
      }
    } else {
      document.querySelector('.ngx-gallery-icon-content.selected').classList.remove('selected');
    }
  }

}
