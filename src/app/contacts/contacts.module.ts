import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ShowRequestsComponent } from './show-requests/show-requests.component';
import { ShowInvitationsComponent } from './show-invitations/show-invitations.component';

@NgModule({
  declarations: [ShowRequestsComponent, ShowInvitationsComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule
  ]
})
export class ContactsModule { }
