import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PartnersRoutingModule} from './partners-routing.module';
import {MenuComponent} from './menu/menu.component';
import {SharedModule} from '../shared/shared.module';
import {FerriesModule} from '../ferries/ferries.module';
import {ShowProfileComponent} from './show-profile/show-profile.component';
import {PartnerDashboardComponent} from './partner-dashboard/partner-dashboard.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {ToursModule} from '../tours/tours.module';
import {FoodDrinkModule} from '../food-drink/food-drink.module';
import {SavePartnerComponent} from './save-partner/save-partner.component';
import {ShowPartnersComponent} from './show-partners/show-partners.component';

@NgModule({
    declarations: [
        MenuComponent,
        ShowProfileComponent,
        PartnerDashboardComponent,
        EditProfileComponent,
        SavePartnerComponent,
        ShowPartnersComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PartnersRoutingModule,
        FerriesModule,
        ToursModule,
        FoodDrinkModule
    ],
    exports: [
        ShowProfileComponent,
        PartnerDashboardComponent,
        EditProfileComponent
    ]
})
export class PartnersModule {
}
