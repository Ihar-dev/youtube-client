import {
  Component,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title: string;
  public SortingBarView: boolean;
  public dataForSearch: string;
  public viewsSortingOrder: string;

  constructor() {
    this.title = 'YouTube-client-app';
    this.SortingBarView = false;
    this.dataForSearch = '';
    this.viewsSortingOrder = '';
  }

  public toggleSortingBar(SortingBarView: boolean): void {
    this.SortingBarView = SortingBarView;
  }

  public makeSearch(dataForSearch: string): void {
    this.dataForSearch = dataForSearch;
  }

  public makeSortingByViews(viewsSortingOrder: string): void {
    this.viewsSortingOrder = viewsSortingOrder;
  }
}
