import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {MainComponent} from './main/main.component';
import {AgmCoreModule} from '@agm/core';

import {
  MatIconModule,
  MatButtonModule,
  MatTreeModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatInputModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatSelectModule
} from '@angular/material';

@NgModule({
  declarations: [MainComponent],
  imports: [
    MatTreeModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    MatSidenavModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    CommonModule,
    HomeRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCgUl40xKEjDAAJNWZHMZqWajSOd25yJOs',
      libraries: ['places'],
    }),

  ]
})
export class HomeModule {
}
