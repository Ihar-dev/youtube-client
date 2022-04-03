import {
  Input,
  Component,
  OnChanges,
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

  ngOnChanges(): void {
    if (this.dataForSearch) this.handleSearch();
  }
}
