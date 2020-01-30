import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ShowRequestsComponent } from './show-requests/show-requests.component';
import { ShowInvitationsComponent } from './show-invitations/show-invitations.component';
import {SharedModule} from '@shared/shared.module';
import { ShowRequestBodyComponent } from './show-request-body/show-request-body.component';

@NgModule({
  declarations: [ShowRequestsComponent, ShowInvitationsComponent, ShowRequestBodyComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    SharedModule
  ]
})
export class ContactsModule { }
