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

  public changeDataForSearch(dataForSearch: string) {
    this.dataForSearch$.next(dataForSearch);
  }

  public changeViewsSortingOrder(viewsSortingOrder: string) {
    this.viewsSortingOrder$.next(viewsSortingOrder);
  }

  public changePublishedAtSortingOrder(publishedAtSortingOrder: string) {
    this.publishedAtSortingOrder$.next(publishedAtSortingOrder);
  }

  public changeFilterSentence(filterSentence: string) {
    this.filterSentence$.next(filterSentence);
  }
}
