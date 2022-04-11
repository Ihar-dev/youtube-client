import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  loginService: LoginService;

  constructor(loginService: LoginService, private router: Router) {
    this.loginService = loginService;
  }

  ngOnInit(): void {
    if (this.loginService.getUserName()) this.router.navigate(['/main']);
  }
}
