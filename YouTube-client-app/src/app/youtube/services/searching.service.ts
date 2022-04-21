import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SortingService } from './sorting.service';

import { SearchResponse } from '../models/search-response.model';
import { PreliminarySearchItem } from '../models/preliminary-search-item.model';
import { SearchItem } from '../models/search-item.model';

enum Settings {
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
  public items$ = new Subject < SearchItem[] >();
  private keyInput$ = new Subject < string >();

  constructor(sortingService: SortingService, private httpClient: HttpClient) {
    this.sortingService = sortingService;
    if (localStorage.getItem('youtube-app-cache-items')) {
      this.cacheItems = JSON.parse(localStorage.getItem('youtube-app-cache-items') || '');
    } else this.cacheItems = {};
    this.keyInput$.pipe(debounceTime(1000)).subscribe(dataForSearch => this.preliminarySearch(dataForSearch));
  }

  public async handleSearch(dataForSearch: string): Promise < void > {
    if (this.cacheItems[dataForSearch]) {
      this.sortingService.items = this.cacheItems[dataForSearch];
      this.tempItems();
    } else this.keyInput$.next(dataForSearch);
  }

  private tempItems(): void {
    this.sortingService.tempItems = this.sortingService.items;
    const sortingButtons: NodeListOf < HTMLElement > | null = document.querySelectorAll('.header__sorting-button');
    if (sortingButtons.length) sortingButtons.forEach(elem => elem.style.textDecoration = 'none');/* eslint-disable-line */
  }

  private preliminarySearch(dataForSearch: string): void {
    this.httpClient.get('search', {
      params: new HttpParams()
        .set('type', 'video')
        .set('part', 'snippet')
        .set('maxResults', Settings.maxResults)
        .set('q', dataForSearch),
    })
      .subscribe((response: any) => {
        const searchData: SearchResponse < PreliminarySearchItem > = response;
        let dataForSecondRequest = '';
        searchData.items.forEach((el, index) => {
          (index) ? dataForSecondRequest += `,${el.id.videoId}` : dataForSecondRequest += el.id.videoId;
        });
        this.mainSearch(dataForSecondRequest, dataForSearch);
      });
  }

  private mainSearch(dataForSecondRequest: string, dataForSearch: string): void {
    this.httpClient.get('videos', {
      params: new HttpParams()
        .set('id', dataForSecondRequest)
        .set('part', 'snippet,statistics'),
    }).subscribe((response: any) => {
      const searchData: SearchResponse < SearchItem > = response;
      this.items$.next(searchData.items);
      this.sortingService.items = searchData.items;
      this.cacheItems[dataForSearch] = searchData.items;
      localStorage.setItem('youtube-app-cache-items', JSON.stringify(this.cacheItems));
      this.tempItems();
    });
  }
}
