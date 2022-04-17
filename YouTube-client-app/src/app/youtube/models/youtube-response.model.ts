import {
  YoutubeItem,
} from './youtube-item.model';

interface YoutubeResponse {
  etag: string;
  items: YoutubeItem[];
  kind: string;
  pageInfo: {
    totalResults: number,
    resultsPerPage: number,
  };
  regionCode: string;
}

export {
  YoutubeResponse,
};
