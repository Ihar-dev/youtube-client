import {
  SearchItem,
} from './search-item.model';

interface SearchResponse {
  kind: string;
  etag: string;
  pageInfo: {
    totalResults: number,
    resultsPerPage: number,
  };
  items: SearchItem[];
}

export {
  SearchResponse,
};
