import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './main/main.component';
import {ContactUsComponent} from '@app/home/contact-us/contact-us.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'contact-us', component: ContactUsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule {
}
