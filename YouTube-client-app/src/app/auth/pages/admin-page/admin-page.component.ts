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
  Router,
} from '@angular/router';

import {
  LoginService,
} from '../../services/login.service';

import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  public readonly loginService: LoginService;
  private readonly adminService: AdminService;
  public cardForm: FormGroup;

  constructor(loginService: LoginService, private router: Router, adminService: AdminService) {
    this.loginService = loginService;
    this.adminService = adminService;
  }

  ngOnInit(): void {
    this.cardForm = new FormGroup({
      userTitle: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      userDescription: new FormControl('', [
        Validators.maxLength(255),
      ]),
      userImg: new FormControl('', [
        Validators.pattern(/(http|https):\/\/([\w.]+\/?)\S*/),
      ]),
      userVideo: new FormControl('', [
        Validators.pattern(/(http|https):\/\/([\w.]+\/?)\S*/),
      ]),
      userDate: new FormControl('', [
        this.inputDateValidator,
      ]),
    });
  }

  private inputDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const dateNow = new Date();
    const inputDate = new Date(control.value);
    if (dateNow.getUTCDate() < inputDate.getUTCDate()) return { forbiddenDate: true };
    return null;
  }

  public get userTitle(): AbstractControl | null {
    return this.cardForm.get('userTitle');
  }

  public submitForm(
    userTitle: string,
    isUserTitleInvalid: boolean,
    userDescription: string,
    isUserDescriptionInvalid: boolean,
    userImg: string,
    isUserImgInvalid: boolean,
    userVideo: string,
    isUserVideoInvalid: boolean,
    userDate: string,
    isUserDateInvalid: boolean,
  ): void {
    if (isUserTitleInvalid || isUserDescriptionInvalid || isUserImgInvalid || isUserVideoInvalid || isUserDateInvalid) return;
    this.adminService.addNewCard(userTitle, userDescription, userImg, userVideo, userDate);
    this.router.navigate(['/main']);
  }
}
