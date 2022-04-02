import {
  EventEmitter,
  Output,
  Component,
  OnInit,
} from '@angular/core';

// import { SearchResponse } from '../../../models/search-response.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
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

  ngOnInit(): void {}
}
