import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginService } from '../../../auth/services/login.service';
import { HeaderBarService } from '../../services/header-bar.service';

import { HeaderBarModel } from '../../models/header-bar.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public readonly loginService: LoginService;
  private readonly headerBarService: HeaderBarService;
  public headerBarConditions: HeaderBarModel;
  private loggedInSubs: Subscription;
  public logTitle: string;

  constructor(loginService: LoginService, headerBarService: HeaderBarService) {
    this.loginService = loginService;
    this.headerBarConditions = headerBarService.headerBarConditions;
    this.headerBarService = headerBarService;
    (this.loginService.getUserName()) ? this.logTitle = 'log out' : this.logTitle = 'log in';
  }

  public getUserName(): string {
    return (this.loginService.getUserName()) ? this.loginService.getUserName() : 'not authorized';
  }

  ngOnInit(): void {
    this.loggedInSubs = this.loginService.loggedIn$.subscribe((loggedIn: boolean): void => {
      (loggedIn) ? this.logTitle = 'log out' : this.logTitle = 'log in';
    });
  }

  ngOnDestroy(): void {
    this.loggedInSubs.unsubscribe();
  }

  public toggleSortingBar(): void {
    this.headerBarConditions.SortingBarView = !this.headerBarConditions.SortingBarView;
  }

  public makeSearch(dataForSearch: string): void {
    if (!this.loginService.getUserName() || !dataForSearch) return;
    this.headerBarService.changeDataForSearch(dataForSearch);
  }
}
