import { Component } from '@angular/core';

import { LoginService } from '../../../auth/services/login.service';
import { HeaderBarService } from '../../services/header-bar.service';

import { HeaderBarModel } from '../../models/header-bar.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public readonly loginService: LoginService;
  private readonly headerBarService: HeaderBarService;
  public headerBarConditions: HeaderBarModel;

  constructor(loginService: LoginService, headerBarService: HeaderBarService) {
    this.loginService = loginService;
    this.headerBarConditions = headerBarService.headerBarConditions;
    this.headerBarService = headerBarService;
  }

  public toggleSortingBar(): void {
    this.headerBarConditions.SortingBarView = !this.headerBarConditions.SortingBarView;
  }

  public makeSearch(dataForSearch: string): void {
    if (!this.loginService.getUserName() || !dataForSearch) return;
    this.headerBarService.changeDataForSearch(dataForSearch);
  }
}
