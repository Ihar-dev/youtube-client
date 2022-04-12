import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { HeaderBarService } from '../../../../core/services/header-bar.service';
import { SearchItem } from '../../../models/search-item.model';
import { SearchResponse } from '../../../models/search-response.model';
import { HeaderBarModel } from '../../../../core/models/header-bar.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  private readonly headerBarService: HeaderBarService;
  public headerBarConditions: HeaderBarModel;
  private dataForSearchSubs: Subscription;
  public items: SearchItem[];
  private tempItems: SearchItem[];

  constructor(headerBarService: HeaderBarService) {
    this.headerBarService = headerBarService;
    this.headerBarConditions = headerBarService.headerBarConditions;
    this.items = [];
    this.tempItems = [];
  }

  ngOnInit(): void {
    this.dataForSearchSubs = this.headerBarService.dataForSearch$.subscribe((dataForSearch) => {
      console.log(dataForSearch);
      this.handleSearch();
    });
  }

  ngOnDestroy(): void {
    this.dataForSearchSubs.unsubscribe();
  }

  private async handleSearch(): Promise < void > {
    let searchData: SearchResponse;
    searchData = this.getDefaultSearchData();
    searchData = await this.getSearchResults();
    this.items = searchData.items;
    this.tempItems = this.items;
    console.log(this.items);
    const sortingButtons: NodeListOf < HTMLElement > | null = document.querySelectorAll('.header__sorting-button');
    if (sortingButtons.length) sortingButtons.forEach(elem => elem.style.textDecoration = 'none');/* eslint-disable-line */
  }

  private async getSearchResults(): Promise < SearchResponse > {
    let searchData: SearchResponse;
    searchData = this.getDefaultSearchData();
    const url = 'https://raw.githubusercontent.com/Ihar-dev/tasks/master/tasks/angular/response.json';
    const res = await fetch(url);
    searchData = await res.json();
    return searchData;
  }

  private getDefaultSearchData(): SearchResponse {
    const data = {
      kind: '',
      etag: '',
      pageInfo: {
        totalResults: 0,
        resultsPerPage: 0,
      },
      items: [],
    };
    return data;
  }
}
