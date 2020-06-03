import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FerriesRoutingModule} from './ferries-routing.module';
import {SaveFerryComponent} from './save-ferry/save-ferry.component';
import {ShowFerriesComponent} from './show-ferries/show-ferries.component';
import {SharedModule} from '@shared/shared.module';
import {FerriesHomeComponent} from './ferries-home/ferries-home.component';
import {FerriesHeaderComponent} from './ferries-header/ferries-header.component';
import {ChatModule} from '@app/chat/chat.module';
import { ManageRoutesComponent } from './manage-routes/manage-routes.component';
import { ManagePricesRoutesComponent } from './manage-prices-routes/manage-prices-routes.component';
import { AddRoutesComponent } from './manage-prices-routes/add-routes/add-routes.component';
import { AddPricesComponent } from './manage-prices-routes/add-prices/add-prices.component';

@NgModule({
  declarations: [
    SaveFerryComponent,
    ShowFerriesComponent,
    FerriesHomeComponent,
    FerriesHeaderComponent,
    ManageRoutesComponent,
    ManagePricesRoutesComponent,
    AddRoutesComponent,
    AddPricesComponent
  ],
  imports: [
    CommonModule,
    FerriesRoutingModule,
    SharedModule,
    ChatModule
  ],
  exports: [
    FerriesHeaderComponent
  ]
})
export class FerriesModule {
}
