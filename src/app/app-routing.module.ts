import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
  // {path: 'admin-panel', loadChildren: './admin-login/admin-login.module#AdminLoginModule'},
  {path: '', loadChildren: './home/home.module#HomeModule'},
  {path: 'partners', loadChildren: './partners/partners.module#PartnersModule'},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
