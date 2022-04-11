import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YoutubeRoutingModule } from './youtube-routing.module';
import { SearchItemComponent } from './pages/search/search-item/search-item.component';
import { SearchResultsComponent } from './pages/search/search-results/search-results.component';

@NgModule({
  declarations: [
    SearchItemComponent,
    SearchResultsComponent
  ],
  imports: [
    CommonModule,
    YoutubeRoutingModule,
  ],
})
export class YoutubeModule { }
