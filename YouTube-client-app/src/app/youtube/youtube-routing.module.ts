import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchResultsComponent } from './pages/search/search-results/search-results.component';

const youtubeRoutes: Routes = [
  { path: 'main', component: SearchResultsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(youtubeRoutes)],
  exports: [RouterModule],
})
export class YoutubeRoutingModule { }
