import { Injectable } from '@angular/core';
import { YoutubeAppAuthorization } from '../models/youtube-app-authorization.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  authorization: YoutubeAppAuthorization;

  constructor() {
    this.authorization = {
      userName: '',
    };
  }
}
