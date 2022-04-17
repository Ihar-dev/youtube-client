import { Injectable } from '@angular/core';

import { SearchItem } from '../models/search-item.model';
import { SearchResponse } from '../models/search-response.model';
import { YoutubeResponse } from '../models/youtube-response.model';
// import { YoutubeItem } from '../models/youtube-item.model';

enum Settings {
  APIUrl = 'https://www.googleapis.com/youtube/v3/',
  key = 'AIzaSyAWpNsq0IfVimHbVnIeNAEpT883uTazfvk',
  maxResults = '12',
}

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  private viewsSortingOrder: string;
  private publishedAtSortingOrder: string;
  private filterSentence: string;
  public items: SearchItem[];
  private tempItems: SearchItem[];

  public async handleSearch(dataForSearch: string): Promise < void > {
    let searchData: SearchResponse;
    searchData = this.getDefaultSearchData();
    searchData = await this.getYoutubeSearchResults(dataForSearch);
    console.log(searchData);
    this.items = searchData.items;
    this.tempItems = this.items;
    const sortingButtons: NodeListOf < HTMLElement > | null = document.querySelectorAll('.header__sorting-button');
    if (sortingButtons.length) sortingButtons.forEach(elem => elem.style.textDecoration = 'none');/* eslint-disable-line */
  }

  private async getYoutubeSearchResults(dataForSearch: string): Promise < SearchResponse > {
    let searchData: YoutubeResponse;
    searchData = this.getDefaultYoutubeData();
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
    let secondSearchData: SearchResponse;
    secondSearchData = this.getDefaultSearchData();
    secondSearchData = await this.getYoutubeSecondSearchResults(dataForSecondRequest);
    return secondSearchData;
  }

  private async getYoutubeSecondSearchResults(dataForSecondRequest: string): Promise < SearchResponse > {
    let searchData: SearchResponse;
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
    console.log(searchData);
    return searchData;
  }

  private getDefaultYoutubeData(): YoutubeResponse {
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
