import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { SearchResultsComponent } from './youtube/components/search/search-results/search-results.component';
import { SearchItemComponent } from './youtube/components/search/search-item/search-item.component';
import { HeaderComponent } from './core/components/header/header.component';
import { SortingBarComponent } from './core/components/sorting-bar/sorting-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchResultsComponent,
    SearchItemComponent,
    HeaderComponent,
    SortingBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CoreModule,
    AuthModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
