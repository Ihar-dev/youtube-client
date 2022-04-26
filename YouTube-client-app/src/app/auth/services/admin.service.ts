import {
  Injectable
} from '@angular/core';
import {
  Store
} from '@ngrx/store';

import {
  addCard
} from '../../redux/actions/creator';
import {
  SearchItem
} from '../../youtube/models/search-item.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private store: Store) {}

  public addNewCard(userTitle: string, userDescription: string, userImg: string, userVideo: string, userDate: string): void {
    let item: SearchItem = this.getDefaultItem();
    item.snippet.title = userTitle;
    item.snippet.description = userDescription;
    item.snippet.thumbnails.medium.url = userImg;
    item.snippet.thumbnails.maxres.url = userImg;
    item.snippet.publishedAt = userDate;
    item.id = userVideo;

    this.store.dispatch(addCard());
  }

  private getDefaultItem(): SearchItem {
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
          default: {
            url: '',
            width: 0,
            height: 0,
          },
          medium: {
            url: '',
            width: 0,
            height: 0,
          },
          high: {
            url: '',
            width: 0,
            height: 0,
          },
          standard: {
            url: '',
            width: 0,
            height: 0,
          },
          maxres: {
            url: '',
            width: 0,
            height: 0,
          },
        },
        channelTitle: '',
        tags: [],
        categoryId: '',
        liveBroadcastContent: '',
        localized: {
          title: '',
          description: '',
        },
        defaultAudioLanguage: '',
      },
      statistics: {
        viewCount: '0',
        likeCount: '0',
        favoriteCount: '0',
        commentCount: '0',
      }
    };
  }
}
