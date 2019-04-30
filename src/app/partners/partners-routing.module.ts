import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowFerriesComponent} from '../ferries/show-ferries/show-ferries.component';
import {MainDashboardComponent} from '../shared/components/main-dashboard/main-dashboard.component';
import {SaveFerryComponent} from '../ferries/save-ferry/save-ferry.component';
import {ProfileComponent} from './profile/profile.component';


const routes: Routes = [
    {path: 'dashboard', component: MainDashboardComponent},
    {path: 'profile/show', component: ProfileComponent},
    {
        path: 'ferries/show',
        component: ShowFerriesComponent
    },
    {
        path: 'ferries/add',
        component: SaveFerryComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PartnersRoutingModule {
}
