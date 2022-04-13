import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YoutubeRoutingModule } from './youtube-routing.module';

import { SearchItemComponent } from './pages/main/search-item/search-item.component';
import { SearchResultsComponent } from './pages/main/search-results/search-results.component';
import { DetailedComponent } from './pages/main/detailed/detailed.component';
import { GetBorderColorDirective } from './directives/get-border-color.directive';

@NgModule({
  declarations: [
    SearchItemComponent,
    SearchResultsComponent,
    DetailedComponent,
    GetBorderColorDirective,
  ],
  imports: [
    CommonModule,
    YoutubeRoutingModule,
  ],
})
export class YoutubeModule { }
