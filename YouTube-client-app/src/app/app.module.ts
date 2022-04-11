import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { YoutubeModule } from './youtube/youtube.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { SortingBarComponent } from './core/components/sorting-bar/sorting-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SortingBarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    CoreModule,
    AuthModule,
    YoutubeModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
