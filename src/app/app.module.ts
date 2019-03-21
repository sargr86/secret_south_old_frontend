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

import {
  MatIconModule,
  MatTreeModule,
  MatProgressBarModule,
  MatButtonModule,
  MatInputModule,
  MatSidenavModule
} from '@angular/material';
import {NotFoundComponent} from './not-found/not-found.component';

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
    MatTreeModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule

  ],
  providers: [AdminService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
