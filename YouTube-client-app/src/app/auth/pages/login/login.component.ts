import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  userName: string;
  loginService: LoginService;

  constructor(loginService: LoginService) {
    this.loginService = loginService;
    this.userName = loginService.getUserName();
  }

  ngOnInit(): void {
  }
}
