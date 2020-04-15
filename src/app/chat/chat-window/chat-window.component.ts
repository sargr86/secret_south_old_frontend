import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Socket} from 'ngx-socket-io';
import {ChatService} from '@core/services/chat.service';
import {AuthService} from '@core/services/auth.service';
import * as jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, AfterViewChecked {

  chatForm: FormGroup;
  sender;
  selectedUser;
  connectedUsers = [];
  authUser;
  isDriver;
  isOperator;
  userPosition;
  messages = [];
  receivedMessages = [];
  newMessages = [];

  @ViewChild('messagesList') private messagesList: ElementRef;

  constructor(
    private fb: FormBuilder,
    private socket: Socket,
    private chatService: ChatService,
    public auth: AuthService
  ) {
    this.chatForm = this.fb.group({message: ['', Validators.required]});

  }

  ngOnInit() {
    this.handleSocketEvents();
    this.handleUserData();
    if (this.isOperator) {
      this.openForm();
    }
  }

  handleUserData() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authUser = jwtDecode(token);
      this.userPosition = this.authUser.position.name;
      this.isDriver = this.userPosition === 'Driver';
      this.isOperator = this.userPosition === 'Operator' || this.userPosition === 'Director';
    }
  }


  handleSocketEvents() {
    this.socket.emit('update-connected-users');

    this.socket.on('messageSent', data => {
      this.sender = data.from;
      this.messages.push(data);
      this.receivedMessages = this.messages.filter(d => d.from === 'Operator');
      this.newMessages = this.receivedMessages.filter(d => !d.seen);
    });

    this.socket.on('update-usernames', users => {
      users.map(user => {
        user.username = this.getUsername(user.username);
        if (!this.connectedUsers.find(u => u.email === user.email)) {

          this.connectedUsers.push(user);
        }
      });
    });

  }

  sendMessage(e) {
    if (e.which === 13) {
      const sendData: any = {
        msg: this.chatForm.value['message'],
        from_user_id: this.auth.userData.id,
        seen: false
      };
      if (this.selectedUser || !this.isOperator) { // this.chatForm.valid &&
        if (this.isOperator) {
          sendData.from = 'Operator';
          sendData.to = this.selectedUser.username;
          sendData.to_user_id = this.selectedUser.id;
        } else {
          sendData.from = this.auth.userData.socket_nickname;
          sendData.to = 'Operator';
          sendData.to_user_id = '';
        }
        this.socket.emit('sendMessage', sendData);
        this.chatForm.patchValue({message: ''});
        sendData.from = 'You';
        // this.messages.push(sendData);
      }
    }
  }

  selectUser(user) {
    this.selectedUser = user;
    this.loadMessages();
    if (this.isOperator) {
      this.socket.emit('newUser', {socket_nickname: 'Operator', email: user.email});
    } else {

      // this.socket.emit('newUser', this.auth.userData);
    }

  }

  getUsername(username) {
    if (username === this.authUser.socket_nickname) {
      return 'You';
    } else {
      return username ? username.replace(/_/g, ' ') : '';
    }
  }

  loadMessages() {
    const userData = {
      user_id: this.isOperator ? this.selectedUser.id : this.authUser.id
    };
    this.chatService.loadMessages(userData).subscribe((dt: any) => {
      this.messages = dt;
      this.receivedMessages = dt.filter(d => d.from === 'Operator');
      this.newMessages = this.receivedMessages.filter(d => !d.seen);
    });
  }

  scrollMsgsToBottom() {
    try {
      this.messagesList.nativeElement.scrollTop = this.messagesList.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  openForm() {
    document.getElementById('chatPopup').style.display = 'block';
    if (!this.isOperator) {
      this.loadMessages();
    }
  }

  closeForm() {
    document.getElementById('chatPopup').style.display = 'none';
  }

  ngAfterViewChecked() {
    this.scrollMsgsToBottom();
  }
}
