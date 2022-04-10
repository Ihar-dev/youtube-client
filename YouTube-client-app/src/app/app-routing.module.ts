import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { SortingBarComponent } from './core/components/sorting-bar/sorting-bar.component';
import { HeaderComponent } from './core/components/header/header.component';

const routes: Routes = [
  { path: '', component: SortingBarComponent },
  { path: 'log', component: HeaderComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
