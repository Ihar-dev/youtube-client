type ThumbNailType = {
  url: string,
  width: number,
  height: number,
};

interface SearchItem {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string,
    channelId: string,
    title: string,
    description: string,
    thumbnails: {
      default: ThumbNailType,
      medium: ThumbNailType,
      high: ThumbNailType,
      standard: ThumbNailType,
      maxres: ThumbNailType,
    },
    channelTitle: string,
    tags: string [],
    categoryId: string,
    liveBroadcastContent: string,
    localized: {
      title: string,
      description: string,
    },
    defaultAudioLanguage: string,
  };
  statistics: {
    viewCount: string,
    likeCount: string,
    dislikeCount: string,
    favoriteCount: string,
    commentCount: string,
  };
}

export {
  SearchItem,
};
