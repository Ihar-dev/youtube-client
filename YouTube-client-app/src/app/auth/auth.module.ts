import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './pages/login/login.component';
import { MaterialModule } from '../material/material.module';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

@NgModule({
  declarations: [
    LoginComponent,
    AdminPageComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoginComponent,
  ],
})

export class AuthModule { }
