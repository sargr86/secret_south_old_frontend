import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {SharedModule} from '../shared/shared.module';
import {SidebarComponent} from './sidebar/sidebar.component';
import {MainSectionsComponent} from './main-sections/main-sections.component';
import {AccommodationModule} from '../accommodation/accommodation.module';
import {FooterComponent} from './footer/footer.component';

@NgModule({
    declarations: [NavbarComponent, SidebarComponent, MainSectionsComponent, FooterComponent],
    imports: [
        CommonModule,
        SharedModule,
        AccommodationModule
    ],
    exports: [
        NavbarComponent,
        SidebarComponent,
        FooterComponent
    ]
})
export class LayoutModule {
}
