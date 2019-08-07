import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {SharedModule} from '../shared/shared.module';
import {SidebarComponent} from './sidebar/sidebar.component';
import {AccommodationModule} from '../accommodation/accommodation.module';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {FoodDrinkModule} from '../food-drink/food-drink.module';
import {FerriesModule} from '../ferries/ferries.module';
import {ActivitiesModule} from '../activities/activities.module';
import {ToursModule} from '../tours/tours.module';

@NgModule({
    declarations: [NavbarComponent, SidebarComponent, FooterComponent, HeaderComponent],
    imports: [
        CommonModule,
        SharedModule,
        AccommodationModule,
        FoodDrinkModule,
        FerriesModule,
        ActivitiesModule,
        ToursModule
    ],
    exports: [
        NavbarComponent,
        SidebarComponent,
        FooterComponent,
        HeaderComponent,
    ]
})
export class LayoutModule {
}
