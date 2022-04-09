import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchResultsComponent } from './youtube/components/search/search-results/search-results.component';

const routes: Routes = [
  { path: 'dist/you-tube-client-app', component: SearchResultsComponent },
  /* { path: 'about', component: AboutComponent},
  { path: '**', component: NotFoundComponent } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
