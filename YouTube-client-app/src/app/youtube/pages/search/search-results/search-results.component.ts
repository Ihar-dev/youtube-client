import {
  Component, OnInit, OnDestroy,
} from '@angular/core';
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
  private viewsSortingOrder: string;
  private publishedAtSortingOrder: string;
  private filterSentence: string;

  private readonly headerBarService: HeaderBarService;
  public headerBarConditions: HeaderBarModel;
  private dataForSearchSubs: Subscription;
  private viewsSortingOrderSubs: Subscription;
  private publishedAtSortingOrderSubs: Subscription;
  private filterSentenceSubs: Subscription;
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

    this.viewsSortingOrderSubs = this.headerBarService.viewsSortingOrder$.subscribe((viewsSortingOrder) => {
      this.viewsSortingOrder = viewsSortingOrder;
      this.handleViewsSortingOrderChange();
    });

    this.publishedAtSortingOrderSubs = this.headerBarService.publishedAtSortingOrder$.subscribe((publishedAtSortingOrder) => {
      this.publishedAtSortingOrder = publishedAtSortingOrder;
      this.handlePublishedAtSortingOrderChange();
    });

    this.filterSentenceSubs = this.headerBarService.filterSentence$.subscribe((filterSentence) => {
      this.filterSentence = filterSentence;
      this.filterBySentence();
    });
  }

  ngOnDestroy(): void {
    this.dataForSearchSubs.unsubscribe();
    this.viewsSortingOrderSubs.unsubscribe();
    this.publishedAtSortingOrderSubs.unsubscribe();
    this.filterSentenceSubs.unsubscribe();
  }

  private async handleSearch(): Promise < void > {
    let searchData: SearchResponse;
    searchData = this.getDefaultSearchData();
    searchData = await this.getSearchResults();
    this.items = searchData.items;
    this.tempItems = this.items;
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

  private handleViewsSortingOrderChange(): void {
    if (this.viewsSortingOrder === 'increasing') {
      this.items.sort((a, b) => Number(a.statistics.viewCount) - Number(b.statistics.viewCount));
      if (!this.filterSentence) this.tempItems = this.items;
    }
    if (this.viewsSortingOrder === 'decreasing') {
      this.items.sort((a, b) => Number(b.statistics.viewCount) - Number(a.statistics.viewCount));
      if (!this.filterSentence) this.tempItems = this.items;
    }
  }

  private handlePublishedAtSortingOrderChange(): void {
    if (this.publishedAtSortingOrder === 'increasing') {
      this.items.sort((a, b) => {
        if (new Date(a.snippet.publishedAt) < new Date(b.snippet.publishedAt)) return -1;
        if (new Date(a.snippet.publishedAt) > new Date(b.snippet.publishedAt)) return 1;
        return 0;
      });
      if (!this.filterSentence) this.tempItems = this.items;
    }
    if (this.publishedAtSortingOrder === 'decreasing') {
      this.items.sort((a, b) => {
        if (new Date(a.snippet.publishedAt) > new Date(b.snippet.publishedAt)) return -1;
        if (new Date(a.snippet.publishedAt) < new Date(b.snippet.publishedAt)) return 1;
        return 0;
      });
      if (!this.filterSentence) this.tempItems = this.items;
    }
  }

  private filterBySentence(): void {
    const re = new RegExp(this.filterSentence, 'i');
    this.items = this.tempItems.filter(el => el.snippet.title.match(re));
    const sortingButtons: NodeListOf < HTMLElement > | null = document.querySelectorAll('.header__sorting-button');
    if (window.getComputedStyle(sortingButtons[0]).textDecoration.slice(0, 9) === 'underline') {
      this.handlePublishedAtSortingOrderChange();
    }
    if (window.getComputedStyle(sortingButtons[1]).textDecoration.slice(0, 9) === 'underline') {
      this.handleViewsSortingOrderChange();
    }
  }
}
