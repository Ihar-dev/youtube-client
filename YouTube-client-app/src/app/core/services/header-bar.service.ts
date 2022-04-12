import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { HeaderBarModel } from '../models/header-bar.model';

@Injectable({
  providedIn: 'root',
})

export class HeaderBarService {
  public headerBarConditions: HeaderBarModel;
  public dataForSearch$: Subject < string >;

  constructor() {
    this.headerBarConditions = {
      SortingBarView: false,
    };
    this.dataForSearch$ = new Subject < string >();
  }

  public changeDataForSearch(dataForSearch: string) {
    this.dataForSearch$.next(dataForSearch);
  }
}
