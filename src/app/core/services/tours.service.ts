import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_URL} from '../constants/global';
import {map} from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  constructor(private http: HttpClient) {
  }

  public getAllpartner() {

    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      })
    };

    return this.http.get(`${API_URL}partners/get`);
  }

  public insertToursType(data) {

    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      })
    };

    return this.http.post(`${API_URL}tour_types/add`, data, httpOptions);
  }

  public getAllTourTypes() {

    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      })
    };

    return this.http.get(`${API_URL}tour_types/get`, httpOptions);
  }


  updateToursType(params) {
    return this.http.put(`${API_URL}tour_types/update`, params);
  }

  removeToursType(params) {
    return this.http.post(`${API_URL}tour_types/remove`, params);
  }

  getOneTourType(params) {
    console.log('OK')
    return this.http.get(`${API_URL}tour_types/get-one`, {params: params});
  }


  //// TOURS


  public getAllTours() {

    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      })
    };

    return this.http.get(API_URL + 'tours/get', httpOptions);
  }

  add(data) {

    return this.http.post(`${API_URL}tours/add`, data);
  }

  update(params) {
    return this.http.put(`${API_URL}tours/update`, params);
  }

  remove(params) {
    return this.http.delete(`${API_URL}tours/remove`, {params});
  }

  removeImage(params) {
    return this.http.delete(`${API_URL}tours/remove-image`, {params});
  }

  makeCover(params) {
    return this.http.put(`${API_URL}tours/make-cover`, params);
  }

  getOneTour(params) {
    return this.http.get(`${API_URL}tours/get-one`, {params});
  }

  getPartners() {
    return this.http.get(API_URL + 'tours/get-partners');
  }

  getDailies(params) {
    return this.http.get(API_URL + 'tours/get-dailies', {params}).pipe(
      map((results: any[]) => {
        // console.log(results)
        // console.log(results[0].start_date + ' ' + results[0].start_time)
        return results.map((tour) => {
          return {
            title: tour.tour.name,
            start: new Date(tour.start_date + ' ' + tour.start_time),
            end: new Date(tour.end_date + ' ' + tour.end_time),
            color: 'red',
            allDay: true,
            meta: tour,
            draggable: true,
            resizable: {
              beforeStart: true, // this allows you to configure the sides the event is resizable from
              afterEnd: true,
            }
          };
        });
      })
    );
  }

  updateTourDates(params) {
    return this.http.put(`${API_URL}tours/update-dates`, params);
  }

  addDailyTour(params) {
    return this.http.post(`${API_URL}tours/add-daily`, params);
  }

  updateDailyTour(params) {
    return this.http.put(`${API_URL}tours/update-daily`, params);
  }

  removeDailyTour(params) {
    return this.http.delete(`${API_URL}tours/remove-daily`, {params});
  }

  searchInDailyTours(params) {
    return this.http.get(`${API_URL}tours/search-daily`, {params});
  }


}
