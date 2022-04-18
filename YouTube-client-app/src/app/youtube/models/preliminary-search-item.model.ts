type ThumbNailType = {
  url: string,
  width: number,
  height: number,
};

interface PreliminarySearchItem {
  etag: string;
  id: {
    kind: string,
    videoId: string,
  };
  kind: string;
  snippet: {
    channelId: string,
    channelTitle: string,
    description: string,
    liveBroadcastContent: string,
    publishTime: string,
    publishedAt: string,
    thumbnails: {
      default: ThumbNailType,
      medium: ThumbNailType,
      high: ThumbNailType,
    },
    title: string,
  };
}

export {
  PreliminarySearchItem,
};
