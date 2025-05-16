export type TVideo = {
  videoId: string;
  createdAt: number;
  author: VideoAuthor;
  stats: VideoStats;
  caption: string;
  hashtags: string[];
  music?: VideoMusic;
  imageUrl: string;
  poi?: VideoPoi;
};

export type VideoAuthor = {
  username: string;
  stats: AuthorStats;
}

export type AuthorStats = {
  followerCount: number;
  followingCount: number;
  friendCount: number;
  totalLikes: number;
  totalVideos: number;
}

export type VideoStats = {
  likes: number;
  comments: number;
  shares: number;
  collects: number;
  reposts: number;
  views: number;
}

export type VideoMusic = {
  title: string;
}

export type VideoPoi = {
  name: string;
}
