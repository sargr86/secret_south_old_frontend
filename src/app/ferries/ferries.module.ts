import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FerriesRoutingModule} from './ferries-routing.module';
import {SaveFerryComponent} from './save-ferry/save-ferry.component';
import {ShowFerriesComponent} from './show-ferries/show-ferries.component';
import {SharedModule} from '@shared/shared.module';
import {FerriesHomeComponent} from './ferries-home/ferries-home.component';
import {FerriesHeaderComponent} from './ferries-header/ferries-header.component';
import {ChatModule} from '@app/chat/chat.module';

@NgModule({
  declarations: [SaveFerryComponent, ShowFerriesComponent, FerriesHomeComponent, FerriesHeaderComponent],
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
