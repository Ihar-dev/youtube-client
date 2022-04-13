import { Injectable } from '@angular/core';

import {
  CanActivate, UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { LoginService } from '../../auth/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class MainGuard implements CanActivate {
  constructor(private readonly loginService: LoginService) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.loginService.getUserName()) return true;
    alert('You are not authorized yet!');/* eslint-disable-line */
    return false;
  }
}
