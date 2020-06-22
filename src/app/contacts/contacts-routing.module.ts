import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowRequestsComponent} from '@app/contacts/show-requests/show-requests.component';
import {ShowInvitationsComponent} from '@app/contacts/show-invitations/show-invitations.component';
import {ShowRequestBodyComponent} from '@app/contacts/show-request-body/show-request-body.component';
import {NumericIdGuard} from '@core/guards/numeric-id.guard';
import {AdminPagesGuard} from '@core/guards/admin-pages.guard';

const routes: Routes = [
  {
    path: '',
    component: ShowRequestsComponent,
    canActivate: [AdminPagesGuard]
  },
  {
    path: 'requests',
    component: ShowRequestsComponent
  },
  {
    path: ':id',
    component: ShowRequestBodyComponent,
    canActivate: [
      NumericIdGuard
    ]
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
