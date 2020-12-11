import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FerriesRoutingModule} from './ferries-routing.module';
import {SaveFerryComponent} from './save-ferry/save-ferry.component';
import {ShowFerriesComponent} from './show-ferries/show-ferries.component';
import {SharedModule} from '@shared/shared.module';
import {FerriesHomeComponent} from './ferries-home/ferries-home.component';
import {FerriesHeaderComponent} from './ferries-header/ferries-header.component';
import {ChatModule} from '@app/chat/chat.module';
import {ManageAllComponent} from './manage-all/manage-all.component';
import {ImportFromFileComponent} from './manage-all/import-from-file/import-from-file.component';
import {RoutesPricesTableComponent} from './manage-all/routes-prices-table/routes-prices-table.component';
import {ShowOrdersComponent} from '@app/ferries/show-orders/show-orders.component';
import { ManageMapRoutesComponent } from './manage-map-routes/manage-map-routes.component';
import { ManageTableRoutesComponent } from './manage-table-routes/manage-table-routes.component';

@NgModule({
  declarations: [
    SaveFerryComponent,
    ShowFerriesComponent,
    FerriesHomeComponent,
    FerriesHeaderComponent,
    ManageAllComponent,
    ImportFromFileComponent,
    RoutesPricesTableComponent,
    ShowOrdersComponent,
    ManageMapRoutesComponent,
    ManageTableRoutesComponent
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
