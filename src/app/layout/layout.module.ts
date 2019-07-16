import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {SharedModule} from "../shared/shared.module";
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainSectionsComponent } from './main-sections/main-sections.component';
import {AccommodationModule} from '../accommodation/accommodation.module';

@NgModule({
    declarations: [NavbarComponent, SidebarComponent, MainSectionsComponent],
    imports: [
        CommonModule,
        SharedModule,
        AccommodationModule
    ],
    exports: [
        NavbarComponent,
        SidebarComponent
    ]
})
export class LayoutModule {
}
