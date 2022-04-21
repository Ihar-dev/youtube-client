interface SearchResponse < T > {
  etag: string;
  items: T[];
  kind: string;
  pageInfo: {
    totalResults: number,
    resultsPerPage: number,
  };
  regionCode: string;
}

export {
  SearchResponse,
};
