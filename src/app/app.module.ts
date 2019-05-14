import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AdminService} from './admin.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AgmCoreModule} from '@agm/core';

// Form
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StorageServiceModule} from 'angular-webstorage-service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import 'hammerjs';

import {NotFoundComponent} from './not-found/not-found.component';
import {MaterialModule} from './shared/modules/material.module';
import {ToastrModule} from 'ngx-toastr';
import {RequestInterceptor} from './shared/helpers/http.interceptor';
import {JwtHelperService} from '@auth0/angular-jwt';
import {JwtModule} from '@auth0/angular-jwt';
import {LayoutModule} from './layout/layout.module';

// Token getter for JWT module
export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBo6kYTZfGkPGVCGzMiX_LsR8VN_pc6RJE',
            libraries: ['places', 'geometry'],
        }),
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        LayoutModule,
        ReactiveFormsModule,
        StorageServiceModule,
        MaterialModule,
        ToastrModule.forRoot({
            preventDuplicates: true
        }),
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ['localhost:3000', '68.183.36.96:80'],
                blacklistedRoutes: ['localhost:3000/auth/', '68.183.36.96:80/auth/']
            }
        }),
    ],
    providers: [
        AdminService,
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
