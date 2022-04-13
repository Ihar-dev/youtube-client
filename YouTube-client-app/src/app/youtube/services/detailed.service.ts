import { Injectable } from '@angular/core';

import { SearchItem } from '../models/search-item.model';

type ThumbNailType = {
  url: string,
  width: number,
  height: number,
};

@Injectable({
  providedIn: 'root',
})
export class DetailedService {
  public item: SearchItem;

  constructor() {
    this.item = this.getDefaultItem();
  }

  private getDefaultItem(): SearchItem {
    const defaultThumbNail: ThumbNailType = {
      url: '',
      width: 0,
      height: 0,
    };

    return {
      kind: '',
      etag: '',
      id: '',
      snippet: {
        publishedAt: '',
        channelId: '',
        title: '',
        description: '',
        thumbnails: {
          default: defaultThumbNail,
          medium: defaultThumbNail,
          high: defaultThumbNail,
          standard: defaultThumbNail,
          maxres: defaultThumbNail,
        },
        channelTitle: '',
        tags: [''],
        categoryId: '',
        liveBroadcastContent: '',
        localized: {
          title: '',
          description: '',
        },
        defaultAudioLanguage: '',
      },
      statistics: {
        viewCount: '',
        likeCount: '',
        dislikeCount: '',
        favoriteCount: '',
        commentCount: '',
      },
    };
  }
}
