import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrdersRoutingModule} from './orders-routing.module';
import {ShowOrdersComponent} from './show-orders/show-orders.component';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [ShowOrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule
  ]
})
export class OrdersModule {
}