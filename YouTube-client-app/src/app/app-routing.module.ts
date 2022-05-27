import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthModule } from './auth/auth.module';
import { YoutubeModule } from './youtube/youtube.module';

import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    AuthModule,
    YoutubeModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
