import {
  EventEmitter,
  Output,
  Component,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() headerToggleEvent = new EventEmitter < boolean >();
  @Output() outDataForSearchEvent = new EventEmitter < string >();

  public SortingBarView: boolean;

  constructor() {
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
