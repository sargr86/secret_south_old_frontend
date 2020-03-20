import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowOrdersComponent} from '@app/orders/show-orders/show-orders.component';

const routes: Routes = [{
  path: 'show',
  component: ShowOrdersComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {
}
