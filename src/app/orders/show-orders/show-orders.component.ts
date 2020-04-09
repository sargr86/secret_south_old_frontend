import {Component, OnInit} from '@angular/core';
import {CommonService} from '@core/services/common.service';
import {OrdersService} from '@core/services/orders.service';
import {SubjectService} from '@core/services/subject.service';
import {AuthService} from '@core/services/auth.service';
import * as jwtDecode from 'jwt-decode';
import {DRIVER_ORDER_TABS, ALL_ORDER_TABS} from '@core/constants/settings';
import {Subscription} from 'rxjs';
import {count} from 'rxjs/operators';
import {Socket} from 'ngx-socket-io';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChatService} from '@core/services/chat.service';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.scss']
})
export class ShowOrdersComponent implements OnInit {
  orders;
  authUser;
  isDriver;
  isOperator;
  tabs;
  selectedTab;
  subscriptions: Subscription[] = [];
  userPosition;
  chatForm: FormGroup;
  messages = [];
  sender;
  selectedUser;
  connectedUsers = [];


  constructor(
    public common: CommonService,
    private ordersService: OrdersService,
    private subject: SubjectService,
    public auth: AuthService,
    private socket: Socket,
    private fb: FormBuilder,
    private chatService: ChatService
  ) {

    this.chatForm = this.fb.group({message: ['', Validators.required]});
  }

  ngOnInit() {
    this.setUserTabs();
    this.getStatusCounts();
    this.handleSocketEvents();
  }

  setUserTabs() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authUser = jwtDecode(token);
    }
    this.userPosition = this.authUser.position.name;
    this.isDriver = this.userPosition === 'Driver';
    this.isOperator = this.userPosition === 'Operator' || this.userPosition === 'Director';
    this.selectedTab = this.isDriver ? 'Assigned' : 'Pending';
    this.tabs = this.isDriver ? DRIVER_ORDER_TABS : ALL_ORDER_TABS;
  }

  tabChanged(e) {
    this.selectedTab = e.tab.textLabel;
    this.subject.setOrderTypeData(this.selectedTab.toLowerCase());
    this.getStatusCounts();
  }

  getStatusCounts(socketChanged = false) {
    const sendData = {};

    // For driver role sending his email
    if (this.isDriver) {
      sendData['driverEmail'] = this.authUser.email;
    } else if (this.userPosition === 'Customer') {
      sendData['customerEmail'] = this.authUser.email;
    }
    // Resetting all counts if socket changed
    if (socketChanged) {
      this.tabs = this.isDriver ? DRIVER_ORDER_TABS : ALL_ORDER_TABS;
      this.tabs.map(tab => {
        tab.count = 0;
      });
    }
    this.subscriptions.push(this.ordersService.getStatusCounts(sendData).subscribe((dt: any) => {
      if (dt) {

        dt.statuses.map(d => {
          this.tabs.map(tab => {
            const tabName = tab.name.toLowerCase();
            if (d.name === tabName) {
              tab.count = d.count;
            } else if (tabName === 'all') {
              tab.count = dt.count;
            }
          });
        });
      }


      this.common.dataLoading = false;
    }));
  }

  getStatusName(tab) {
    return tab.toLowerCase();
  }

  openForm() {
    document.getElementById('chatPopup').style.display = 'block';
  }

  closeForm() {
    document.getElementById('chatPopup').style.display = 'none';
  }

  handleSocketEvents() {

    this.socket.emit('get-connected-users');

    this.socket.on('messageSent', data => {
      console.log('message sent', data)
      this.sender = data.from;
      this.messages.push(data);
    });
    this.socket.on('update-usernames', users => {
      console.log('connected users!!!!')
      this.connectedUsers = users;
    });

    this.socket.on('joinedRoom', roomName => {
      console.log('room name:' + roomName);
    });
  }

  sendMessage() {
    if (this.chatForm.valid && this.selectedUser) {
      const msg = this.chatForm.value['message'];
      const sendData = {
        from: 'Operator',
        to: this.selectedUser.username,
        msg: this.chatForm.value['message'],
        from_email: this.auth.userData.email,
        to_email: this.selectedUser.email,
        roomName: this.selectedUser.email + '->Admin'
      };

      this.socket.emit('sendMessage', sendData);
      this.chatForm.patchValue({message: ''});
      sendData.from = 'You';
      this.messages.push(sendData);
    }
  }

  selectUser(user) {
    this.selectedUser = user;
    this.loadMessages();
    console.log(user)

    if (this.isOperator) {
      console.log(this.isOperator)
      this.socket.emit('newUser', {socket_nickname: 'Operator', email: user.email});
    } else {

      this.socket.emit('newUser', this.auth.userData);
    }

  }

  loadMessages() {
    console.log({email: this.authUser.email})
    this.chatService.loadMessages({email: this.selectedUser.email}).subscribe((dt: any) => {
      this.messages = dt;
    });
  }

  disconnectAll() {
    this.socket.emit('disconnect-all');
  }
}
