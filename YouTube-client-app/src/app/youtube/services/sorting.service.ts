import { Injectable } from '@angular/core';

import { SearchItem } from '../models/search-item.model';
import { SearchResponse } from '../models/search-response.model';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  private viewsSortingOrder: string;
  private publishedAtSortingOrder: string;
  private filterSentence: string;
  public items: SearchItem[];
  private tempItems: SearchItem[];

  public async handleSearch(): Promise < void > {
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

  public handleViewsSortingOrderChange(viewsSortingOrder: string): void {
    this.viewsSortingOrder = viewsSortingOrder;
    if (this.viewsSortingOrder === 'increasing') {
      this.items.sort((a, b) => Number(a.statistics.viewCount) - Number(b.statistics.viewCount));
      if (!this.filterSentence) this.tempItems = this.items;
    }
    if (this.viewsSortingOrder === 'decreasing') {
      this.items.sort((a, b) => Number(b.statistics.viewCount) - Number(a.statistics.viewCount));
      if (!this.filterSentence) this.tempItems = this.items;
    }
  }

  public handlePublishedAtSortingOrderChange(publishedAtSortingOrder: string): void {
    this.publishedAtSortingOrder = publishedAtSortingOrder;
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

  public filterBySentence(filterSentence: string): void {
    this.filterSentence = filterSentence;
    const re = new RegExp(this.filterSentence, 'i');
    this.items = this.tempItems.filter(el => el.snippet.title.match(re));
    const sortingButtons: NodeListOf < HTMLElement > | null = document.querySelectorAll('.header__sorting-button');
    if (window.getComputedStyle(sortingButtons[0]).textDecoration.slice(0, 9) === 'underline') {
      this.handlePublishedAtSortingOrderChange(this.publishedAtSortingOrder);
    }
    if (window.getComputedStyle(sortingButtons[1]).textDecoration.slice(0, 9) === 'underline') {
      this.handleViewsSortingOrderChange(this.viewsSortingOrder);
    }
  }
}
