import { Injectable } from '@angular/core';

import { SortingService } from './sorting.service';

import { SearchResponse } from '../models/search-response.model';
import { YoutubeResponse } from '../models/youtube-response.model';

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

  constructor(sortingService: SortingService) {
    this.sortingService = sortingService;
  }

  public async handleSearch(dataForSearch: string): Promise < void > {
    let searchData: SearchResponse;
    searchData = this.getDefaultSearchData();
    searchData = await this.getYoutubeSearchResults(dataForSearch);
    console.log(searchData);
    this.sortingService.items = searchData.items;
    this.sortingService.tempItems = this.sortingService.items;
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
}
