import {
  EventEmitter,
  Output,
  Component,
} from '@angular/core';

import { LoginService } from '../../../auth/services/login.service';
import { HeaderBarService } from '../../services/header-bar.service';

import { HeaderBarModel } from '../../models/header-bar.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() outDataForSearchEvent = new EventEmitter < string >();

  public loginService: LoginService;
  public headerBarConditions: HeaderBarModel;

  constructor(loginService: LoginService, headerBarService: HeaderBarService) {
    this.loginService = loginService;
    this.headerBarConditions = headerBarService.headerBarConditions;
  }

  public toggleSortingBar(): void {
    this.headerBarConditions.SortingBarView = !this.headerBarConditions.SortingBarView;
  }

  public makeSearch(dataForSearch: string): void {
    this.outDataForSearchEvent.emit(dataForSearch);
  }
}
