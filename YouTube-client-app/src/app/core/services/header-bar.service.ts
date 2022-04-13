import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { HeaderBarModel } from '../models/header-bar.model';

@Injectable({
  providedIn: 'root',
})

export class HeaderBarService {
  public headerBarConditions: HeaderBarModel;
  public dataForSearch$ = new Subject < string >();
  public viewsSortingOrder$ = new Subject < string >();
  public publishedAtSortingOrder$ = new Subject < string >();
  public filterSentence$ = new Subject < string >();

  constructor() {
    this.headerBarConditions = {
      SortingBarView: false,
    };
  }

  public changeDataForSearch(dataForSearch: string): void {
    this.dataForSearch$.next(dataForSearch);
  }

  public changeViewsSortingOrder(viewsSortingOrder: string): void {
    this.viewsSortingOrder$.next(viewsSortingOrder);
  }

  public changePublishedAtSortingOrder(publishedAtSortingOrder: string): void {
    this.publishedAtSortingOrder$.next(publishedAtSortingOrder);
  }

  public changeFilterSentence(filterSentence: string): void {
    this.filterSentence$.next(filterSentence);
  }
}
