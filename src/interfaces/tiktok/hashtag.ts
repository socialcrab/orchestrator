import { ChartCategory, ChartHeatmap, ChartMost, ChartPerDate, ChartPerDay, VideoInfo } from "./chart"

export type HashtagPublicMetrics = {
  viewCount  : Number
  videoCount : Number
}

export type HashtagKeyMetrics = {
  analyzedVideoCount : Number

  totalLikes    : Number
  totalComments : Number
  totalCollects : Number
  totalViews    : Number
  totalReposts  : Number
  totalShare    : Number

  contributors       : Number
  followerReach      : Number
  followerImpression : Number

  totalEngagement : Number

  avgViews : Number
}

export type HashtagChartData = {
  videoPerDates : ChartPerDate[]

  likePerDates    : ChartPerDate[]
  commentPerDates : ChartPerDate[]

  reachPerDates : ChartPerDate[]

  viewPerDates : ChartPerDate[]

  participations : ChartCategory[]
  mostMusic      : ChartMost[]
  mostWords      : ChartMost[]
  mostHashtags   : ChartMost[]

  videoActivity    : ChartHeatmap[]
  audienceActivity : ChartHeatmap[]

  videoPerDay             : ChartPerDay[]
  viewPerDay              : ChartPerDay[]
  totalEngagementPerDay   : ChartPerDay[]
  avgEngagementPerDay     : ChartPerDay[]
  totalFollowerReacPerDay : ChartPerDay[]
}

export type HashtagTopPosts = {
  mostViewed                : VideoInfo[]
  highestEngagement         : VideoInfo[]
  mostLikes                 : VideoInfo[]
  mostCommented             : VideoInfo[]
  highestFollowerReach      : VideoInfo[]
  highestFollowerImpression : VideoInfo[]
}

export type InfluencersReport = {
  potentialInfluencer : ChartCategory[]
  totalFollowerReach  : InfluencerRanking[]
  totalVideos         : InfluencerRanking[]
  totalEngagements    : InfluencerRanking[]
}

export type InfluencerRanking = {
  username   : String
  value      : Number
  percentage : Number
}

export type InfluencerInfo = {
  username        : String
  name            : String
  profileImageUrl : String
  followerCount   : Number
  totalVideos     : Number
  videoEngagement : Number
}

export type THashtagInfo = {
  key         : String
  hashtag     : String
  hashtagLink : String

  publicMetrics     : HashtagPublicMetrics
  keyMetrics        : HashtagKeyMetrics
  chartData         : HashtagChartData
  topPosts          : HashtagTopPosts
  influencersReport : InfluencersReport

  startDate : Date
  endDate   : Date
  createdAt : Date
}