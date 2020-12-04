import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '@core/constants/global';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(
    private httpClient: HttpClient
  ) {
  }


  get() {
    return this.httpClient.get(`${API_URL}locations/get`, {});
  }
}
