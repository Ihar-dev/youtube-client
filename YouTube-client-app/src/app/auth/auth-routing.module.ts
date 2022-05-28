import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainGuard } from '../youtube/guards/main.guard';
import { LoginComponent } from './pages/login/login.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

const authRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminPageComponent, canActivate: [MainGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
