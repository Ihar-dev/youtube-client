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

  constructor() {
    this.title = 'YouTube-client-app';
    this.SortingBarView = false;
    this.dataForSearch = '';
  }

  public toggleSortingBar(SortingBarView: boolean): void {
    this.SortingBarView = SortingBarView;
  }

  public makeSearch(dataForSearch: string): void {
    this.dataForSearch = dataForSearch;
  }
}
