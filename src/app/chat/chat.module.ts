import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [ChatWindowComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    SharedModule
  ],
  exports: [
    ChatWindowComponent
  ]
})
export class ChatModule { }
