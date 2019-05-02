import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShowAccommodationsComponent} from './show-accommodations/show-accommodations.component';
import {SaveAccommodationComponent} from './save-accommodation/save-accommodation.component';
import {OneAccommodationResolverService} from '../shared/resolvers/one-accommodation-resolver.service';

const routes: Routes = [
  {path: '', component: ShowAccommodationsComponent},
  {
    path: 'add', component: SaveAccommodationComponent,
    data: {
      title: 'Add accommodation',
    },
  },
  {
    path: ':id', component: SaveAccommodationComponent, data: {
      title: 'Edit an accommodation info',
    },
    resolve: {
      oneAccommodation: OneAccommodationResolverService
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccommodationRoutingModule { }
