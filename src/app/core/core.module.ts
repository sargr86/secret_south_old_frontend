import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from '@core/components/layout/header/header.component';
import {FooterComponent} from '@core/components/layout/footer/footer.component';
import {NavbarComponent} from '@core/components/layout/navbar/navbar.component';
import {SidebarComponent} from '@core/components/layout/sidebar/sidebar.component';
import {SharedModule} from '@shared/shared.module';

@NgModule({
    declarations: [
        NavbarComponent,
        HeaderComponent,
        SidebarComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        NavbarComponent,
        HeaderComponent,
        SidebarComponent,
        FooterComponent
    ]
})
export class CoreModule {
}
