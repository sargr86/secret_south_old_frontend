import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Socket} from 'ngx-socket-io';
import {ChatService} from '@core/services/chat.service';
import {AuthService} from '@core/services/auth.service';
import * as jwtDecode from 'jwt-decode';
import {WebSocketService} from '@core/services/websocket.service';

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
  typingMsg = '';

  @ViewChild('messagesList') private messagesList: ElementRef;

  constructor(
    private fb: FormBuilder,
    private socket: Socket,
    private chatService: ChatService,
    private websocketService: WebSocketService,
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
    this.websocketService.emit('update-connected-users');
    this.websocketService.on('typingBack').subscribe((data: any) => {
      console.log('typing console')
      console.log(data)
      if (this.authUser.id !== data.from_user_id) {
        if (data.msg) {
          this.typingMsg = this.getUsername(data.from) + ' is typing...';
        } else {
          this.typingMsg = '';
        }
      }
    });
    this.websocketService.on('messageSent').subscribe((data: any) => {
      this.sender = data.from;
      this.typingMsg = '';

      if (data.from_user_id !== this.authUser.id) {
        this.messages.push(data);
        this.receivedMessages = this.messages.filter(d => d.from === 'Operator');
        this.newMessages = this.receivedMessages.filter(d => !d.seen);
      }
    });


    this.websocketService.on('update-usernames').subscribe((users: any) => {
      this.connectedUsers = [];
      this.typingMsg = '';
      users.map(user => {
        if (!this.connectedUsers.find(u => u.email === user.email)) {
          this.connectedUsers.push(user);
        }
      });

    });

  }

  sendTyping() {
    console.log('send typing')
    const sendData = this.getSendData();
    this.websocketService.emit('typing', sendData);
  }

  sendMessage(e) {

    if (e.which === 13) {

      const sendData = this.getSendData();
      this.websocketService.emit('sendMessage', sendData);
      this.chatForm.patchValue({message: ''});

      sendData.from = 'You';
      this.messages.push(sendData);
      this.receivedMessages = this.messages.filter(d => d.from === 'Operator');
      this.newMessages = this.receivedMessages.filter(d => !d.seen);
    } else {
      this.sendTyping();
    }
  }

  getSendData() {
    const sendData: any = {
      msg: this.chatForm.value['message'],
      from_user_id: this.auth.userData.id,
      seen: false
    };
    if (this.selectedUser || !this.isOperator) { // this.chatForm.valid &&
      if (this.isOperator) {
        sendData.from = 'Operator';
        sendData.to = this.selectedUser.socket_nickname;
        sendData.to_user_id = this.selectedUser.id;
      } else {
        sendData.from = this.auth.userData.socket_nickname;
        sendData.to = 'Operator';
        sendData.to_user_id = '';
      }
    }
    return sendData;
  }


  selectUser(user) {
    this.selectedUser = user;
    this.loadMessages();
    // if (this.isOperator) {
    //   this.websocketService.emit('newUser', {socket_nickname: 'Operator', email: user.email});
    // } else {
    //   this.websocketService.emit('newUser', {socket_nickname: 'Operator', email: ''});
    // }

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

  getUsername(username) {
    if (this.authUser && username === this.authUser.socket_nickname) {
      return 'You';
    } else {
      return username ? username.replace(/_/g, ' ') : '';
    }
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
      this.selectUser(this.authUser);
    }
  }

  closeForm() {
    document.getElementById('chatPopup').style.display = 'none';
  }

  ngAfterViewChecked() {
    this.scrollMsgsToBottom();
  }
}
