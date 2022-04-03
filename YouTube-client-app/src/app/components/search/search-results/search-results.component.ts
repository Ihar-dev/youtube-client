import {
  Input,
  Component,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import {
  SearchItem,
} from '../../../models/search-item.model';

import {
  SearchResponse,
} from '../../../models/search-response.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnChanges {
  @Input() public dataForSearch: string;
  @Input() public SortingBarView: boolean;
  @Input() public viewsSortingOrder: string;
  @Input() public publishedAtSortingOrder: string;

  public items: SearchItem[];

  constructor() {
    this.items = [];
  }

  private async handleSearch(): Promise < void > {
    let searchData: SearchResponse;
    searchData = this.getDefaultSearchData();
    searchData = await this.getSearchResults();
    this.items = searchData.items;
    console.log(this.dataForSearch);
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

  private handleViewsSortingOrderChange(): void {
    if (this.viewsSortingOrder === 'increasing') {
      this.items.sort((a, b) => Number(a.statistics.viewCount) - Number(b.statistics.viewCount));
    }
    if (this.viewsSortingOrder === 'decreasing') {
      this.items.sort((a, b) => Number(b.statistics.viewCount) - Number(a.statistics.viewCount));
    }
  }

  private handlePublishedAtSortingOrderChange(): void {
    if (this.publishedAtSortingOrder === 'increasing') {
      this.items.sort((a, b) => {
        if (new Date(a.snippet.publishedAt) > new Date(b.snippet.publishedAt)) return -1;
        if (new Date(a.snippet.publishedAt) < new Date(b.snippet.publishedAt)) return 1;
        return 0;
      });
    }
    if (this.publishedAtSortingOrder === 'decreasing') {
      this.items.sort((a, b) => {
        if (new Date(a.snippet.publishedAt) < new Date(b.snippet.publishedAt)) return -1;
        if (new Date(a.snippet.publishedAt) > new Date(b.snippet.publishedAt)) return 1;
        return 0;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const dataForSearchChange = changes['dataForSearch'];
    if (dataForSearchChange && dataForSearchChange.currentValue !== dataForSearchChange.previousValue) {/* eslint-disable-line */
      if (this.dataForSearch) this.handleSearch();
    }
    const viewsSortingOrderChange = changes['viewsSortingOrder'];
    if (viewsSortingOrderChange && this.viewsSortingOrder) this.handleViewsSortingOrderChange();
    const publishedAtSortingOrderChange = changes['publishedAtSortingOrder'];
    if (publishedAtSortingOrderChange && this.publishedAtSortingOrder) this.handlePublishedAtSortingOrderChange();/* eslint-disable-line */
  }
}
