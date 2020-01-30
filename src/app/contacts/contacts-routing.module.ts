import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowRequestsComponent} from '@app/contacts/show-requests/show-requests.component';
import {ShowInvitationsComponent} from '@app/contacts/show-invitations/show-invitations.component';
import {ShowRequestBodyComponent} from '@app/contacts/show-request-body/show-request-body.component';

const routes: Routes = [
  {
    path: 'requests',
    component: ShowRequestsComponent
  },
  {
    path: ':id',
    component: ShowRequestBodyComponent
  },
  {
    path: 'invitations',
    component: ShowInvitationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule {
}
