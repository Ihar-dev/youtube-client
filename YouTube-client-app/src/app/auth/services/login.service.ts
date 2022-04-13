import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AppAuthorizationModel } from '../models/youtube-app-authorization.model';

enum AuthSettings {
  tokenLength = 25,
  tokenPossibleSymbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
}

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  private authorization: AppAuthorizationModel;

  constructor(private router: Router) {
    if (localStorage.getItem('youtube-app-authorization')) {
      this.authorization = JSON.parse(localStorage.getItem('youtube-app-authorization') || '');
    } else this.authorization = this.getDefault();
  }

  public getUserName(): string {
    return this.authorization.userName;
  }

  public setUser(userName: string, password: string, isUserNameInvalid: boolean, isUserPasswordInvalid: boolean): void {
    if (isUserNameInvalid || isUserPasswordInvalid) return;
    this.authorization.userName = userName;
    this.authorization.password = password;
    let text = '';
    for (let i = 0; i < AuthSettings.tokenLength; i++) {
      text += AuthSettings.tokenPossibleSymbols.charAt(Math.floor(Math.random() * AuthSettings.tokenPossibleSymbols.length));
    }
    this.authorization.token = text;
    localStorage.setItem('youtube-app-authorization', JSON.stringify(this.authorization));
    this.router.navigate(['/main']);
  }

  public resetUser(): void {
    this.authorization = this.getDefault();
    localStorage.setItem('youtube-app-authorization', '');
    this.router.navigate(['/login']);
  }

  private getDefault(): AppAuthorizationModel {
    return {
      userName: '',
      token: '',
      password: '',
    };
  }
}
