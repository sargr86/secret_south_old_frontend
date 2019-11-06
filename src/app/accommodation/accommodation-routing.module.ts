import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowAccommodationsComponent} from './show-accommodations/show-accommodations.component';
import {SaveAccommodationComponent} from './save-accommodation/save-accommodation.component';
import {OneAccommodationResolverService} from '@core/resolvers/one-accommodation-resolver.service';
import {AccommodationsHomeComponent} from './accommodations-home/accommodations-home.component';
import {AccommodationsListComponent} from './accommodations-list/accommodations-list.component';
import {AccommodationSingleComponent} from './accommodation-single/accommodation-single.component';

const routes: Routes = [
    {path: '', component: AccommodationsHomeComponent},
    {path: 'single/:id', component: AccommodationSingleComponent},
    {path: 'list', component: AccommodationsListComponent},
    {path: 'show', component: ShowAccommodationsComponent},
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
            accommodation: OneAccommodationResolverService
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccommodationRoutingModule {
}
