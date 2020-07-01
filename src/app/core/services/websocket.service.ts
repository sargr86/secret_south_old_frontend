import {Injectable} from '@angular/core';
import io from 'socket.io-client';
import {API_URL} from '@core/constants/global';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket;

  constructor() {
    this.socket = io(API_URL);
  }

  emit(eventName: string, data: any = {}) {
    this.socket.emit(eventName, data);
  }

  on(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }
}
