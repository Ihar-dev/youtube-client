import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';

import {
  LoginService,
} from '../../services/login.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  public readonly loginService: LoginService;
  public cardForm: FormGroup;

  constructor(loginService: LoginService) {
    this.loginService = loginService;
  }

  ngOnInit(): void {
    this.cardForm = new FormGroup({
      userTitle: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      userPassword: new FormControl('', [
        Validators.minLength(8),
        Validators.pattern(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/),
      ]),
    });
  }

  public get userTitle(): AbstractControl | null {
    return this.cardForm.get('userTitle');
  }
}
