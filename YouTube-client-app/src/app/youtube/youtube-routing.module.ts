import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainGuard } from './guards/main.guard';

import { SearchResultsComponent } from './pages/main/search-results/search-results.component';
import { DetailedComponent } from './pages/main/detailed/detailed.component';

const youtubeRoutes: Routes = [
  {
    path: 'main',
    component: SearchResultsComponent,
    canActivate: [MainGuard],
  },
  { path: 'main/:id/detailed', component: DetailedComponent, canActivate: [MainGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(youtubeRoutes)],
  exports: [RouterModule],
})
export class YoutubeRoutingModule { }
