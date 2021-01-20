import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
// import {AgmCoreModule} from '@agm/core';

// Form
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import 'hammerjs';

import {MaterialModule} from '@core/modules/material.module';
import {RequestInterceptor} from '@core/helpers/http.interceptor';
import {JwtHelperService} from '@auth0/angular-jwt';
import {JwtModule} from '@auth0/angular-jwt';
import {CoreModule} from '@core/core.module';
import { CalendarModule } from 'angular-calendar';

import {DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';

export function momentAdapterFactory() {
  return adapterFactory(moment);
};

// Token getter for JWT module
export function tokenGetter() {
  return localStorage.getItem('token') || '';
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    ReactiveFormsModule,
    MaterialModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:3000', '68.183.36.96:80', 'secretsouth.ie', '68.183.36.96'],
        blacklistedRoutes: ['localhost:3000/auth/', '68.183.36.96:80/auth/', 'secretsouth.ie/auth/', '68.183.36.96/auth/']
      }
    }),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
  ],
  providers: [
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
