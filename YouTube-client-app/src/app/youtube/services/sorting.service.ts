import { Injectable } from '@angular/core';

import { SearchItem } from '../models/search-item.model';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  private viewsSortingOrder: string;
  private publishedAtSortingOrder: string;
  private filterSentence: string;
  public items: SearchItem[];
  public tempItems: SearchItem[];

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
