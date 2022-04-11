import {
  Component,
} from '@angular/core';

/* import {
  SearchItem,
} from '../../../models/search-item.model'; */

/* import {
  SearchResponse,
} from '../../../models/search-response.model'; */

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})

export class SearchResultsComponent {}
/* export class SearchResultsComponent implements OnChanges {
  @Input() public dataForSearch: string;
  @Input() public SortingBarView: boolean;
  @Input() public viewsSortingOrder: string;
  @Input() public publishedAtSortingOrder: string;
  @Input() public filterSentence: string;

  public items: SearchItem[];
  private tempItems: SearchItem[];

  constructor() {
    this.items = [];
    this.tempItems = [];
  }

  private async handleSearch(): Promise < void > {
    let searchData: SearchResponse;
    searchData = this.getDefaultSearchData();
    searchData = await this.getSearchResults();
    this.items = searchData.items;
    this.tempItems = this.items;
    const sortingButtons: NodeListOf < HTMLElement > | null = document.querySelectorAll('.header__sorting-button');
    if (sortingButtons.length) sortingButtons.forEach(elem => elem.style.textDecoration = 'none');
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
        if (new Date(a.snippet.publishedAt) > new Date(b.snippet.publishedAt)) return -1;
        if (new Date(a.snippet.publishedAt) < new Date(b.snippet.publishedAt)) return 1;
        return 0;
      });
      if (!this.filterSentence) this.tempItems = this.items;
    }
    if (this.publishedAtSortingOrder === 'decreasing') {
      this.items.sort((a, b) => {
        if (new Date(a.snippet.publishedAt) < new Date(b.snippet.publishedAt)) return -1;
        if (new Date(a.snippet.publishedAt) > new Date(b.snippet.publishedAt)) return 1;
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

  ngOnChanges(changes: SimpleChanges): void {
    const dataForSearchChange = changes['dataForSearch'];
    if (dataForSearchChange && dataForSearchChange.currentValue !== dataForSearchChange.previousValue) {
      if (this.dataForSearch) this.handleSearch();
    }
    const viewsSortingOrderChange = changes['viewsSortingOrder'];
    if (viewsSortingOrderChange && this.viewsSortingOrder) this.handleViewsSortingOrderChange();
    const publishedAtSortingOrderChange = changes['publishedAtSortingOrder'];
    if (publishedAtSortingOrderChange && this.publishedAtSortingOrder) this.handlePublishedAtSortingOrderChange();
    const filterSentenceChange = changes['filterSentence'];
    if (filterSentenceChange && !filterSentenceChange.firstChange) this.filterBySentence();
  }
} */

/* eslint-disable-line */
