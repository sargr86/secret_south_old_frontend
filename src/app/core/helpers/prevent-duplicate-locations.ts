import {FormGroup} from '@angular/forms';

export function preventDuplicateLocations(start: string, stop_1: string, stop_2: string, end: string) {
  return (group: FormGroup): { [key: string]: any } => {
    const startPoint = group.controls[start];
    const stop1 = group.controls[stop_1];
    const stop2 = group.controls[stop_2];
    const endPoint = group.controls[end];

    // If there is 'required' or other errors on specified controls returning back
    if (startPoint.errors && !startPoint.errors.duplicateLocation
      && endPoint.errors && !endPoint.errors.duplicateLocation
    ) {
      return;
    }

    const points = {
      start_point: startPoint.value,
      stop_1: stop1.value, stop_2: stop2.value, end_point: endPoint.value
    };


    for (const key in points) {
      const val = points[key];
      const values = Object.values(points);
      const ownIndex = values.indexOf(val);
      const lastOccurIndex = values.lastIndexOf(val);
      if (val !== '' && ownIndex !== lastOccurIndex) {

        const controlName = Object.keys(points)[lastOccurIndex];
        if (controlName === 'end_point' && stop1.value !== '' && points.start_point === points.end_point) {
          group.controls[controlName].setErrors(null);
        } else {
          group.controls[controlName].setErrors({duplicateLocation: true});
        }
      }
    }

  }
    ;
}
