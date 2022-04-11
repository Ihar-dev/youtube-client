import { Injectable } from '@angular/core';

import { HeaderBarModel } from '../models/header-bar.model';

@Injectable({
  providedIn: 'root',
})

export class HeaderBarService {
  public headerBarConditions: HeaderBarModel;

  constructor() {
    this.headerBarConditions = {
      SortingBarView: false,
    };
  }
}
