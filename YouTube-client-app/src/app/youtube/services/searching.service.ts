import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SortingService } from './sorting.service';

import { SearchResponse } from '../models/search-response.model';
import { PreliminarySearchItem } from '../models/preliminary-search-item.model';
import { SearchItem } from '../models/search-item.model';

enum Settings {
  APIUrl = 'https://www.googleapis.com/youtube/v3/',
  key = 'AIzaSyAWpNsq0IfVimHbVnIeNAEpT883uTazfvk',
  maxResults = '12',
}

@Injectable({
  providedIn: 'root',
})
export class SearchingService {
  private readonly sortingService: SortingService;
  private cacheItems: {
    [key: string]: SearchItem[],
  };

  constructor(sortingService: SortingService, private http: HttpClient) {
    this.sortingService = sortingService;
    if (localStorage.getItem('youtube-app-cache-items')) {
      this.cacheItems = JSON.parse(localStorage.getItem('youtube-app-cache-items') || '');
    } else this.cacheItems = {};
  }

  public async handleSearch(dataForSearch: string): Promise < void > {
    if (this.cacheItems[dataForSearch]) {
      this.sortingService.items = this.cacheItems[dataForSearch];
    } else {
      let searchData: SearchResponse < SearchItem >;
      searchData = this.getDefaultSearchData();
      searchData = await this.getYoutubeSearchResults(dataForSearch);
      this.sortingService.items = searchData.items;
      this.cacheItems[dataForSearch] = searchData.items;
      localStorage.setItem('youtube-app-cache-items', JSON.stringify(this.cacheItems));
    }
    this.sortingService.tempItems = this.sortingService.items;
    const sortingButtons: NodeListOf < HTMLElement > | null = document.querySelectorAll('.header__sorting-button');
    if (sortingButtons.length) sortingButtons.forEach(elem => elem.style.textDecoration = 'none');/* eslint-disable-line */
  }

  private async getYoutubeSearchResults(dataForSearch: string): Promise < SearchResponse < SearchItem > > {
    let searchData: SearchResponse < PreliminarySearchItem >;
    searchData = this.getDefaultPreliminarySearchData();
    try {
      let url = `${Settings.APIUrl}search?key=${Settings.key}`;
      url += `&type=video&part=snippet&maxResults=${Settings.maxResults}`;
      url += `&q=${dataForSearch}`;
      const res = await fetch(url);
      searchData = await res.json();
    } catch (er) {
      console.log(er);
    }
    let dataForSecondRequest = '';
    searchData.items.forEach((el, index) => {
      (index) ? dataForSecondRequest += `,${el.id.videoId}` : dataForSecondRequest += el.id.videoId;
    });
    let secondSearchData: SearchResponse < SearchItem >;
    secondSearchData = this.getDefaultSearchData();
    secondSearchData = await this.getYoutubeSecondSearchResults(dataForSecondRequest);
    return secondSearchData;
  }

  private async getYoutubeSecondSearchResults(dataForSecondRequest: string): Promise < SearchResponse < SearchItem > > {
    let searchData: SearchResponse < SearchItem >;
    searchData = this.getDefaultSearchData();
    try {
      let url = `${Settings.APIUrl}videos?key=${Settings.key}`;
      url += `&id=${dataForSecondRequest}`;
      url += '&part=snippet,statistics';
      const res = await fetch(url);
      searchData = await res.json();
    } catch (er) {
      console.log(er);
    }
    return searchData;
  }

  private getDefaultPreliminarySearchData(): SearchResponse < PreliminarySearchItem > {
    const data = {
      etag: '',
      items: [],
      kind: '',
      pageInfo: {
        totalResults: 0,
        resultsPerPage: 0,
      },
      regionCode: '',
    };
    return data;
  }

  private getDefaultSearchData(): SearchResponse < SearchItem > {
    const data = {
      etag: '',
      items: [],
      kind: '',
      pageInfo: {
        totalResults: 0,
        resultsPerPage: 0,
      },
      regionCode: '',
    };
    return data;
  }
}
