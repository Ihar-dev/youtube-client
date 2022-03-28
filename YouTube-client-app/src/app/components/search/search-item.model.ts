type thumbnailType = {
  url: string,
  width: number,
  height: number,
}

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
      default: thumbnailType,
      medium: thumbnailType,
      high: thumbnailType,
      standard: thumbnailType,
      maxres: thumbnailType,
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
  SearchItem
};
