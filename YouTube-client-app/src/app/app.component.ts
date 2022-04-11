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
  public dataForSearch: string;
  public viewsSortingOrder: string;
  public publishedAtSortingOrder: string;
  public filterSentence: string;

  constructor() {
    this.title = 'YouTube-client-app';
    this.dataForSearch = '';
    this.viewsSortingOrder = '';
    this.publishedAtSortingOrder = '';
    this.filterSentence = '';
  }

  public makeFilterBySentence(filterSentence: string): void {
    this.filterSentence = filterSentence;
  }

  public makeSearch(dataForSearch: string): void {
    this.dataForSearch = dataForSearch;
  }

  public makeSortingByViews(viewsSortingOrder: string): void {
    this.viewsSortingOrder = viewsSortingOrder;
  }

  public makeSortingByPublishedAt(publishedAtSortingOrder: string): void {
    this.publishedAtSortingOrder = publishedAtSortingOrder;
  }
}
