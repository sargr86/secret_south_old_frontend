import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {API_URL} from '@core/constants/settings';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket;

  constructor(
    // private socket: Socket,
    private httpClient: HttpClient
  ) {
  }

  loadMessages(params) {
    return this.httpClient.get(`${API_URL}chat/load-messages`, {params});
  }

  updateSeen(params) {
    return this.httpClient.put(`${API_URL}chat/update-seen`, params);
  }
}
