import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AdminService} from './admin.service';
import {HttpClientModule} from "@angular/common/http";
import {AgmCoreModule} from '@agm/core';
// Form
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StorageServiceModule} from "angular-webstorage-service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import 'hammerjs';

import {
    MatIconModule,
    MatTreeModule,
    MatProgressBarModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatSortModule
} from '@angular/material';
import {NotFoundComponent} from './not-found/not-found.component';
import {MaterialModule} from "./shared/modules/material.module";

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCgUl40xKEjDAAJNWZHMZqWajSOd25yJOs',
            libraries: ['places'],
        }),
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        StorageServiceModule,
        MaterialModule
        // MatTreeModule,
        // MatProgressBarModule,
        // MatButtonModule,
        // MatIconModule,
        // MatInputModule,
        // MatSidenavModule,
        // MatSortModule
    ],
    providers: [AdminService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
