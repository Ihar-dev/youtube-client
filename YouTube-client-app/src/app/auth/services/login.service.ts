import { Injectable } from '@angular/core';
import { YoutubeAppAuthorization } from '../models/youtube-app-authorization.model';

enum AuthSettings {
  tokenLength = 10,
  tokenPossibleSymbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
}

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  private authorization: YoutubeAppAuthorization;

  constructor() {
    if (localStorage.getItem('youtube-app-authorization')) {
      this.authorization = JSON.parse(localStorage.getItem('youtube-app-authorization') || '');
    } else this.authorization = this.getDefault();
  }

  public getUserName(): string {
    return this.authorization.userName;
  }

  public setUser(userName: string, password: string): void {
    this.authorization.userName = userName;
    this.authorization.password = password;
    let text = '';
    for (let i = 0; i < AuthSettings.tokenLength; i++) {
      text += AuthSettings.tokenPossibleSymbols.charAt(Math.floor(Math.random() * AuthSettings.tokenPossibleSymbols.length));/* eslint-disable-line */
    }
    this.authorization.token = text;
    localStorage.setItem('youtube-app-authorization', JSON.stringify(this.authorization));
  }

  public resetUser(): void {
    this.authorization = this.getDefault();
    localStorage.setItem('youtube-app-authorization', '');
  }

  private getDefault(): YoutubeAppAuthorization {
    return {
      userName: '123',
      token: '',
      password: '',
    };
  }
}
