import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PartnersRoutingModule} from './partners-routing.module';
import {MenuComponent} from './menu/menu.component';
import {SharedModule} from '../shared/shared.module';
import {FerriesModule} from '../ferries/ferries.module';
import {ShowProfileComponent} from './show-profile/show-profile.component';
import {PartnerDashboardComponent} from './partner-dashboard/partner-dashboard.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
    declarations: [
        MenuComponent,
        ShowProfileComponent,
        PartnerDashboardComponent,
        EditProfileComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PartnersRoutingModule,
        FerriesModule
    ],
    exports: []
})
export class PartnersModule {
}
