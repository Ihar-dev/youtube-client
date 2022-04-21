import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { LoginService } from '../../../auth/services/login.service';
import { HeaderBarService } from '../../services/header-bar.service';
import { SearchingService } from '../../../youtube/services/searching.service';

import { HeaderBarModel } from '../../models/header-bar.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public readonly loginService: LoginService;
  private readonly headerBarService: HeaderBarService;
  private readonly searchingService: SearchingService;
  public headerBarConditions: HeaderBarModel;
  private loggedInSubs: Subscription;
  public logTitle: string;
  public dataForSearch: string;

  constructor(
    loginService: LoginService,
    headerBarService: HeaderBarService,
    searchingService: SearchingService,
    public router: Router,
  ) {
    this.loginService = loginService;
    this.searchingService = searchingService;
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

  public makeSearch(): void {
    if (!this.loginService.getUserName() || !this.dataForSearch || this.dataForSearch.length < 3) return;
    this.searchingService.handleSearch(this.dataForSearch);
  }
}
