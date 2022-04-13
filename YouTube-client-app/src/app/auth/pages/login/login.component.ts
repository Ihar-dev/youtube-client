import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  public readonly loginService: LoginService;
  public readonly myForm : FormGroup;

  constructor(loginService: LoginService, private router: Router) {
    this.loginService = loginService;
    this.myForm = new FormGroup({
      userName: new FormControl('', Validators.minLength(4)),
      userPassword: new FormControl('', Validators.minLength(6)),
    });
  }

  ngOnInit(): void {
    if (this.loginService.getUserName()) this.router.navigate(['/main']);
  }
}
