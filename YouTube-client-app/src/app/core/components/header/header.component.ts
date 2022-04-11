import {
  EventEmitter,
  Output,
  Component,
} from '@angular/core';

import { LoginService } from '../../../auth/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() headerToggleEvent = new EventEmitter < boolean >();
  @Output() outDataForSearchEvent = new EventEmitter < string >();

  public SortingBarView: boolean;
  loginService: LoginService;

  constructor(loginService: LoginService) {
    this.loginService = loginService;
    this.SortingBarView = false;
  }

  public toggleSortingBar(): void {
    this.SortingBarView = !this.SortingBarView;
    this.headerToggleEvent.emit(this.SortingBarView);
  }

  public makeSearch(dataForSearch: string): void {
    this.outDataForSearchEvent.emit(dataForSearch);
  }
}
